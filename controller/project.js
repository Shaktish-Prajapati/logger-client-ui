const mongoose = require('mongoose')
const dotenv = require('dotenv')
const Projects = require('../model/project')
const QueryHelper = require('../helper/queryHelper')
const fs = require("fs")
dotenv.config();

// Unique number
const {
    makeid,
    removeAllSpecialChars,
    checkCollectionName
} = require('../helper/helperFunctions')

const getDaysArray = function(start, end) {
    for(var arr=[],dt=new Date(start); dt<=end; dt.setDate(dt.getDate()+1)){
        arr.push(new Date(dt).toISOString().split("T")[0]);
    }
    return arr;
};

/**
 * 
 * @param {*} req 
 * @param {*} res 
 */

const getAllRegisterProject = async (req,res)=> {
    try {
        const allRgisterProject = await Projects.find();
        return res.status(200).json({'status':1,"data":{'data':allRgisterProject},"message":"Successful"})
    } catch (error) {
        res.status(500).json({
            status: 0,
            data: {
              err: {
                generatedTime: new Date(),
                errMsg: error.name,
                msg: error.message,
                type: 'ProjectNotFound'
              }
            }
        })
    }
}



/**
 * api      POST @/project_name
 * desc     To create new project
 */

const createNewProject = async (req,res) => {
    try {
        const{
            name,
            description,
            device_type
        } = req.body
        // device type will be  array 
        const arrayOfObjects = [];

        const typeCodeArray = [];

        if (device_type.length === 0) throw {message:"Please provide atleast one device name!"}

        //  loop and set the typecode and enum code
        for (let i = 0; i < device_type.length; i++) {
        arrayOfObjects.push({"typeCode":`00${i+1}`, "typeName":device_type[i]})
        typeCodeArray.push(`"00${i+1}"`)
        }

        const isCollectionExist = await checkCollectionName(name+'_collection');

        if (isCollectionExist) throw {message:"Project name already exist!!"}

        const collection_name = removeAllSpecialChars(name).toLowerCase()+'_collection'
        const project = await new Projects({
            name,
            description,
            code: makeid(5),
            device_types: arrayOfObjects,
            collection_name
        })
        const savedProject = await project.save(project);

        if(!savedProject) throw {message:"Project not created!!"}

        // dynamic schema

        const schemaBlueprint = `const mongoose = require('mongoose')
    
        const schemaOptions = {
            timestamps: true,
            toJSON: {
                virtuals: false
            },
            toObject: {
                virtuals: false
            }
        }
        
        const ${collection_name}Schema = new mongoose.Schema(
            {
                did: {
                    type: String,
                    required: [true, 'Device id is required.'],
                    validate: {
                        validator: function(v) {
                            return /^([0-9A-Fa-f]{2}[:-]){5}([0-9A-Fa-f]{2})|([0-9a-fA-F]{4}\\.[0-9a-fA-F]{4}\\.[0-9a-fA-F]{4})$/.test(v)
                        },
                        message: '{VALUE} is not a valid device id.'
                    }
                },
                logGeneratedDate: {
                    type: Date,
                    required: [true, 'Log generation date is required.']
                },
                logMsg: {
                    type: String,
                    required: [true, 'Log message is required.']
                },
                device_types: {
                    type: String,
                    enum: [${typeCodeArray}],
                    required: [true, "Atleast one model required."]
                },
                logType: {
                    type: String,
                    enum: ["verbose","warn","info","error","debug"],
                    default: "info"
                }
            },
            schemaOptions
        )
                
        const ${collection_name} = mongoose.model('${collection_name}', ${collection_name}Schema)
        
        module.exports = ${collection_name}
        `

        fs.writeFile(`${__dirname.concat(`/../model/${collection_name}.js`)}`, schemaBlueprint, {
            encoding: "utf8",
            flag: "w",
            mode: 0o666
        }, (err) => {
            if (err) throw {"message":"Some error occured during project creation"}
            // {
            //     console.log('err: ', err)
            // }
            console.log('File written successfully')
            // console.log(fs.readFileSync(../models/${schemaName}.js, 'utf8'))
        })


        res.status(201).json({"status":1,"data":{"savedProject": savedProject},"message":"Project Saved succefully"})


    } catch (error) {
        if (error.code === 11000) res.status(409).json({
            status: 0,
            data: {
              err: {
                generatedTime: new Date(),
                errMsg: error.name,
                msg: 'Duplicate Project',
                type: 'DuplicatePojectError'
              }
            }
        })
        res.status(400).json({
            status: 0,
            data: {
              err: {
                generatedTime: new Date(),
                errMsg: error.name,
                msg: error.message,
                type: 'NotFoundError'
              }
            }
      
          })
    }
}


/**
 * api      GET @api/logger/project/:projectCode
 * @param {project code} req 
 * @param {whole project data} res 
 */
const  getProjectWithProjectCode = async (req,res)=>{
    try {
        const {projectCode} = req.params

        const getProject = await Projects.findOne({code:projectCode})

        if (!getProject) throw {
            "status":0,
            "message":"Project code Invalid!!"
        }

        res.status(200).json({
            "status":1,
            "data":{"data":getProject},
            "message":"Successful"
        })

    } catch (error) {
        console.log(error)
        res.status(400).json({
            status: 0,
            data: {
              err: {
                generatedTime: new Date(),
                errMsg: error.name,
                msg: error.message,
                type: 'NotFoundError'
              }
            }
      
          })
    }
}

/**
 * api      POST @api/logger/updateProjectDetail/:projectCode
 * @param {name, 
    * description, 
    * device_type} req 
 * @param {successful} res 
 */

const updateProjectWithProjectCode = async(req,res)=>{
    try {
        const {projectCode} = req.params
        const {
            name,
            description,
            device_type
        } = req.body
        console.log(req.body)
        
        const getProjectWithProjectCode = await Projects.findOne({code:projectCode})

        if (!getProjectWithProjectCode) throw {message:"We don't have any project with this code!!"}
        console.log(device_type)
        if (!device_type) {
            console.log("hello")
        }
        // if(!name  || device_type) throw "Please provide atleast one field to update!!"
        
        // let  modelSchema = `${getProjectWithProjectCode.collection_name}Schema`
        // const `${modelSchema}` = require(`../model/${getProjectWithProjectCode.collectionName}`)

        // Add new element to array
        
        const addNewElementToArray = []
        const newTypeCodeArray = []
        if(device_type) {
            const getLengthOfExistingDeviceType = getProjectWithProjectCode.device_types.length
            console.log(getLengthOfExistingDeviceType)

            getProjectWithProjectCode.device_types.map(deviceTypes => addNewElementToArray.push(deviceTypes));
    
            getProjectWithProjectCode.device_types.map(typeCodes => newTypeCodeArray.push(`"${typeCodes.typeCode}"`))
    
            for (let i = 0; i < device_type.length; i++) {
                addNewElementToArray.push({"typeCode":`00${getLengthOfExistingDeviceType+i+1}`, "typeName":device_type[i]})
                newTypeCodeArray.push(`"00${getLengthOfExistingDeviceType+i+1}"`)
            }
            
            
            const schemaBlueprint = `const mongoose = require('mongoose')
            
            const schemaOptions = {
                timestamps: true,
                toJSON: {
                    virtuals: false
                },
                toObject: {
                    virtuals: false
                }
            }
            
            const ${getProjectWithProjectCode.collection_name}Schema = new mongoose.Schema(
                {
                    did: {
                        type: String,
                        required: [true, 'Device id is required.'],
                        validate: {
                            validator: function(v) {
                                return /^([0-9A-Fa-f]{2}[:-]){5}([0-9A-Fa-f]{2})|([0-9a-fA-F]{4}\\.[0-9a-fA-F]{4}\\.[0-9a-fA-F]{4})$/.test(v)
                            },
                            message: '{VALUE} is not a valid device id.'
                        }
                    },
                    logGeneratedDate: {
                        type: Date,
                        required: [true, 'Log generation date is required.']
                    },
                    logMsg: {
                        type: String,
                        required: [true, 'Log message is required.']
                    },
                    device_types: {
                        type: String,
                        enum: [${newTypeCodeArray}],
                        required: [true, "Atleast one model required."]
                    },
                    logType: {
                        type: String,
                        enum: ["verbose","warn","info","error","debug"],
                        default: "info"
                    }
                },
                schemaOptions
                )
                
                const ${getProjectWithProjectCode.collection_name} = mongoose.model('${getProjectWithProjectCode.collection_name}', ${getProjectWithProjectCode.collection_name}Schema)
                
                module.exports = ${getProjectWithProjectCode.collection_name}
                `
                console.log(newTypeCodeArray);
                console.log(addNewElementToArray)
                
                fs.writeFile(`${__dirname.concat(`/../model/${getProjectWithProjectCode.collection_name}.js`)}`, schemaBlueprint, {
                    encoding: "utf8",
                    flag: "w",
                    mode: 0o666
                }, (err) => {
                    if (err) throw {"message":"Some error occured during project creation"}
                    // {
                    //     console.log('err: ', err)
                    // }
                    console.log('File written successfully')
                    // console.log(fs.readFileSync(../models/${schemaName}.js, 'utf8'))
                })
            }
            
            getProjectWithProjectCode.name = name ? name : getProjectWithProjectCode.name;
            getProjectWithProjectCode.description = description ;
            getProjectWithProjectCode.device_types = device_type? addNewElementToArray : getProjectWithProjectCode.device_types;
            // Updating Data
            
            const isGetProjectWithProjectCodeSaved = getProjectWithProjectCode.save();
            
            if (!isGetProjectWithProjectCodeSaved) throw {
                "status":0,
                "message":"Some error occured during updating the project!!"
            }
            res.status(200).json({
                "status":1,
                "data":{},
                "message":"Project Updated!!"
            })

        
    } catch (error) {
        console.log(error)
        res.status(400).json({
            status: 0,
            data: {
              err: {
                generatedTime: new Date(),
                errMsg: error.name,
                msg: error.message,
                type: 'ProjectUpdateError'
              }
            }
      
          })
    }
}


const makeEntriesInDeviceLogger = async (req,res) => {
    try {
        const {project_code}  = req.params
        // check project exist or not
        const findProjectWithCode = await Projects.findOne({code:project_code})

        if (!findProjectWithCode) throw {
            "status": 0 ,
            "message":"Project does not exist"
        }

        const collectionName = findProjectWithCode.collection_name;

        const modelReference = require(`../model/${collectionName}`)

        const {
            mac_code,
            model_type,
            log_message,
            logGeneratedDate,
            log_type,
        } = req.body

        //  above details will be put in project tables

        //  check device id

        const putDataIntoLoggerDb = await new modelReference({
            did: mac_code,
            logGeneratedDate,
            logMsg: log_message,
            device_types: model_type,
            logType:log_type
        })

        const isLoggerSaved = await putDataIntoLoggerDb.save(putDataIntoLoggerDb)

        if(!isLoggerSaved) throw {
            "status":0,
            "message": "Logger entry failed!"
        }
        
        res.status(201).json({
            "status":1,
            "data":{},
            "message":"Successful"
        })
    } catch (error) {
        console.log(error)
        res.status(400).json({
            status: 0,
            data: {
              err: {
                generatedTime: new Date(),
                errMsg: error.name,
                msg: error.message,
                type: 'LoggerError'
              }
            }
      
        })
    }
}


/**
 * desc     get project with filter
 * api      @/api/logger/projects/getDetails/:projectCode
 * 
 */

const getProjectWithFilter = async(req,res)=>{
    try {
        const {projectCode}  = req.params
        const isProjectExist = await Projects.findOne({code:projectCode})
        if (!isProjectExist) throw {
            "message":"Project code invalid"
        }
        
        const collectionName = require(`../model/${isProjectExist.collection_name}.js`)
        // console.log({...collectionName})
        
        const logTypeList = ["warn","info","error","debug"];
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;
        let logTypeObject;

        const features = new QueryHelper(collectionName.find({}),req.query).filter().sort().paginate()
        logTypeObject = await features.query


        // Sending type name instead of type code
        isProjectExist.device_types.map( device => {
            logTypeObject.map( obj => {
                if(device.typeCode === obj.device_types) {
                    obj.device_types = `${obj.device_types}|${device.typeName}`
                }
            })
        }) 

        return res.json({"status":1,"message":"Successfull ","data":{'count': logTypeObject.length,'logs':logTypeObject}})
    } catch (error) {
        console.log(error)
        return res.json({
            status: 0,
            data: {
              err: {
                generatedTime: new Date(),
                errMsg: error.name,
                msg: error.message,
                type: 'ProjectFilterError'
              }
            }
      
          })
    }
}

/**
 * 
 * @param {params} req 
 * @param {id of all device} res 
 * @returns 
 */
const getdeviceIdProjectWise = async(req,res)=>{
    try {
        const {projectCode}  = req.params
        const isProjectExist = await Projects.findOne({code:projectCode})
        if (!isProjectExist) throw {
            "message":"Project code invalid"
        }
        
        const collectionName = require(`../model/${isProjectExist.collection_name}.js`)
        const listOfId = await collectionName.find().select('did')
        return res.json({
            "status":1,
            "data":{'deviceIds':listOfId},
            "message":"Successful"
        })

    } catch (error) {
        console.log(error)
        return res.json({
            status: 0,
            data: {
              err: {
                generatedTime: new Date(),
                errMsg: error.name,
                msg: error.message,
                type: 'NotFoundError'
              }
            }
      
          })
    }
}

/**
 * desc     provide log count, logType wise count, log created date
 * api      @/api/logger/projects/getLogsCount/:projectCode
 */

const getProjectLogs = async(req,res)=>{
    try {
        const {projectCode} = req.params
        const isProjectExist = await Projects.findOne({code:projectCode})
        if (!isProjectExist) throw {
            "message":"Project code invalid "
        }
        
        const collectionName = require(`../model/${isProjectExist.collection_name}.js`)
        const typeWiseCount = await collectionName.aggregate([{$group :{_id : "$logType", count : {$sum : 1}}},{$project:{logType:"$_id",count:1, _id:0}}]);
        const totalLogCount = await collectionName.aggregate([{$group :{_id : "null", count : {$sum : 1}}}]);
        const lastLogEntry = await collectionName.findOne().sort({'createdAt':-1})

        return res.json({
            "status":1,
            "data":{
                totalLogCount: totalLogCount[0].count,
                typeWiseCount,
                lastLogEntry: lastLogEntry.createdAt
            },
            "message":"successfull"
        })

    } catch (error) {
        return res.json({
            status: 0,
            data: {
              err: {
                generatedTime: new Date(),
                errMsg: error.name,
                msg: error.message,
                type: 'NotFoundError'
              }
            }
      
          })
    }
}

const getDeviceCount = async (req,res) => {
    try {
        const {projectCode} = req.params;
        
        const projectCollection = await Projects.findOne({code: projectCode})
        if(!projectCollection) throw{
            "message":"Project code invalid "
        }
        const createdAt = projectCollection.createdAt;
        
       
        const currentStatus = projectCollection.status;
        
       
        const modelList = projectCollection.device_types
       
     
        const collectionName = require(`../model/${projectCollection.collection_name}.js`)
        if(!collectionName) throw{
            "message":"Collection Name Not Found "
        }
        const collection = await collectionName.find().distinct('did')
    
        return res.json({
            "status":1,
            "data":{
                projectCreationDate: createdAt,
                currentStatus,
                modelList,
                deviceCount: collection.length
            },
            "message":"successfull"
        })
    } catch (error) {
        return res.json({
            data: {
                err: {
                  generatedTime: new Date(),
                  errMsg: error.name,
                  msg: error.message,
                  type: 'NotFoundError'
                }
              }
        
        })
    }
}

const dateWiseLogCount = async (req,res) => {
    try {
        const {projectCode} = req.params;
        const projectCollection = await Projects.findOne({code: projectCode})
        const collectionName = require(`../model/${projectCollection.collection_name}.js`)
        const response = await collectionName.aggregate([
            {
                $match: {createdAt: { $gte: new Date(req.query.startDate), $lte: new Date(req.query.endDate) }}
            },
            {
                $group: {
                    _id: {
                        DATE: { $substr: ["$createdAt", 0, 10]}
                    },
                    countLog: { $sum: 1 }
                }
            },
            // { $sort: { "DATE": -1 } },
            {
                $project: {
                    _id: 0,
                    date: '$_id.DATE',
                    countLog: 1
                }
            },
            {
                $group: {
                    _id: null,
                    stats: { $push: "$$ROOT" }
                }
            },
            {
                $project: {
                    stats: {
                        $map: {
                            input: getDaysArray(new Date(req.query.startDate),new Date(req.query.endDate)),
                            as: "date_new",
                            in: {
                                $let: {
                                    vars: { dateIndex: { "$indexOfArray": ["$stats.date", "$$date_new"] } },
                                    in: {
                                        $cond: {
                                            if: { $ne: ["$$dateIndex", -1] },
                                            then: {
                                                $arrayElemAt: ["$stats", "$$dateIndex"]
                                            },
                                            else: {
                                                DATE: { $substr: [{$toDate: "$$date_new"}, 0, 10] },
                                                countLog: 0
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            },
            {
                $unwind: "$stats"
            },
            {
                $replaceRoot: {
                    newRoot: "$stats"
                }
            }
        ])
        res.status(200).json({status: 1, data: {response}, message: 'Getting log count on the basis of date range.'})
    } catch (error) {
        console.log(error)
    }
}


module.exports = {
    createNewProject,
    getAllRegisterProject,
    makeEntriesInDeviceLogger,
    getProjectWithProjectCode,
    updateProjectWithProjectCode,
    getProjectWithFilter,
    getdeviceIdProjectWise,
    getProjectLogs,
    getDeviceCount,
    dateWiseLogCount
}