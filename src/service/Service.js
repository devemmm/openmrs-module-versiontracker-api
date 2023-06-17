const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const HealthFacility = require('../module/HealthFacility')
const Module = require('../module/Module')
const User = require('../module/User')
const Token = require('../module/Token')
const OpenmrsInformation = require('../module/OpenmrsInformation')
const DataBaseInformation = require('../module/DataBaseInformation')
const JavaRuntimeEnvironmentInformation = require('../module/JavaRuntimeEnvironmentInformation')
const MemoryInformation = require('../module/MemoryInformation')
const { SYSTEM_TITLE_OPENMRS_INFORMATION, SYSTEM_INFO_TITLE_JAVA_RUNTIME_ENVIRONMENT_INFORMATION, MEMORY_INFORMATION, SYSTEM_INFO_TITLE_DATABASE_INFORMATION, SYSTEM_INFO_TITLE_MODULE_INFORMATION } = require('../helper/constant')

class Service {
    constructor() {
        this.modules = "/var/lib/OpenMRS/modules"
    }

    findByCredentials = async (email, password) => {
        if (!email, !password) {
            throw new Error("you must provide email and passwod")
        }

        try {
            let user = await User.findOne({ email })

            if (!user) {
                throw new Error('email not found')
            }
            const { dataValues, _previousDataValues } = user

            user = _previousDataValues
            const isMatch = await bcrypt.compare(password, user.password)

            if (!isMatch) {
                throw new Error("wrong pasword")
            }

            return user
        } catch (error) {
            throw new Error(error.message)
        }
    }


    generateToken = async (id) => {
        const tokenKey = jwt.sign({ id }, process.env.JWT_SECRET)
        try {
            const token = new Token({
                ...{ UserId: id, token: tokenKey }
            })
            return await token.save();
        } catch (error) {
            throw new Error(error.message)
        }
    }

    signin = async (email, password) => {
        try {
            const user = await this.findByCredentials(email, password)
            const token = await this.generateToken(user.id)
            user.token = token.token;
            return user
        } catch (error) {
            throw new Error(error.message)
        }
    }

    signup = async (data) => {
        try {
            let user = new User(data)
            user.password = await bcrypt.hash(data.password, 8)
            return await user.save();
        } catch (error) {
            throw new Error(error.message)
        }
    }

    registerHealthFacility = async (data) => {
        try {
            const healthFacility = new HealthFacility({
                ...data
            })
            await healthFacility.save()
            return { message: "Health Facility Registered successfull", healthFacility }
        } catch (error) {
            throw new Error(error.message)
        }


    }
    
    UpdateSystemInformation = async (data) => {
        try {
            if (data.fosid) {
                const fosid = data.fosid;
                const healthf = await HealthFacility.findOne({ fosid })

                if (healthf) {
                    healthf.lastExcutedPeriod = new Date()
                    await healthf.save();
                } else {
                    throw new Error(`TheHealth facility with this FOSID: ${fosid} not found please contact system administrator`)
                }
                await this.UpdateOpenmrsInformation(data)
                await this.UpdateJavaRuntimeEnvironmentInformation(data)
                await this.UpdateMemoryInformation(data)
                await this.UpdateDataBaseInformation(data)
                await this.UpdateModuleInformation(data)
            }
            return { status: 201, message: "system information updated successfull" }
        } catch (error) {
            throw new Error(error.message)
        }
    }

    UpdateOpenmrsInformation = async (data) => {
        try {
            const incomingOpenmrsInformation = new OpenmrsInformation({
                openmrs_installation_systemdate: data[SYSTEM_TITLE_OPENMRS_INFORMATION.parent_name][SYSTEM_TITLE_OPENMRS_INFORMATION.systemDate],
                openmrs_installation_systemtime: data[SYSTEM_TITLE_OPENMRS_INFORMATION.parent_name][SYSTEM_TITLE_OPENMRS_INFORMATION.systemTime],
                openmrs_installation_openmrs_version: data[SYSTEM_TITLE_OPENMRS_INFORMATION.parent_name][SYSTEM_TITLE_OPENMRS_INFORMATION.openmrsVersion],
                hostname: data[SYSTEM_TITLE_OPENMRS_INFORMATION.parent_name][SYSTEM_TITLE_OPENMRS_INFORMATION.hostname],
                HealthFacilityFosid: data?.fosid
            })

            let openmrsInformation = await OpenmrsInformation.findOne({ where: { HealthFacilityFosid: data.fosid } })

            if (openmrsInformation) {
                openmrsInformation.openmrs_installation_systemdate = incomingOpenmrsInformation.openmrs_installation_systemdate
                openmrsInformation.openmrs_installation_systemtime = incomingOpenmrsInformation.openmrs_installation_systemtime
                openmrsInformation.openmrs_installation_openmrs_version = incomingOpenmrsInformation.openmrs_installation_openmrs_version
                openmrsInformation.hostname = incomingOpenmrsInformation.hostname
                await openmrsInformation.save();
            } else {
                openmrsInformation = await incomingOpenmrsInformation.save();
            }

            return { status: 201, message: "openmrs information updated successfull", openmrsInformation }
        } catch (error) {
            throw new Error(error.message)
        }
    }

    UpdateJavaRuntimeEnvironmentInformation = async (data) => {
        try {
            const incomingJavaRuntimeEnvironmentInformation = new JavaRuntimeEnvironmentInformation({
                operating_system: data[SYSTEM_INFO_TITLE_JAVA_RUNTIME_ENVIRONMENT_INFORMATION.parent_name][SYSTEM_INFO_TITLE_JAVA_RUNTIME_ENVIRONMENT_INFORMATION.operatingSystem],
                operating_system_arch: data[SYSTEM_INFO_TITLE_JAVA_RUNTIME_ENVIRONMENT_INFORMATION.parent_name][SYSTEM_INFO_TITLE_JAVA_RUNTIME_ENVIRONMENT_INFORMATION.operatingSystemArch],
                operating_system_version: data[SYSTEM_INFO_TITLE_JAVA_RUNTIME_ENVIRONMENT_INFORMATION.parent_name][SYSTEM_INFO_TITLE_JAVA_RUNTIME_ENVIRONMENT_INFORMATION.operatingSystemVersion],
                javaVersion: data[SYSTEM_INFO_TITLE_JAVA_RUNTIME_ENVIRONMENT_INFORMATION.parent_name][SYSTEM_INFO_TITLE_JAVA_RUNTIME_ENVIRONMENT_INFORMATION.javaVersion],
                java_vendor: data[SYSTEM_INFO_TITLE_JAVA_RUNTIME_ENVIRONMENT_INFORMATION.parent_name][SYSTEM_INFO_TITLE_JAVA_RUNTIME_ENVIRONMENT_INFORMATION.javaVendor],
                jvm_version: data[SYSTEM_INFO_TITLE_JAVA_RUNTIME_ENVIRONMENT_INFORMATION.parent_name][SYSTEM_INFO_TITLE_JAVA_RUNTIME_ENVIRONMENT_INFORMATION.jvmVersion],
                jvm_vendor: data[SYSTEM_INFO_TITLE_JAVA_RUNTIME_ENVIRONMENT_INFORMATION.parent_name][SYSTEM_INFO_TITLE_JAVA_RUNTIME_ENVIRONMENT_INFORMATION.jvmVendor],
                java_runtime_name: data[SYSTEM_INFO_TITLE_JAVA_RUNTIME_ENVIRONMENT_INFORMATION.parent_name][SYSTEM_INFO_TITLE_JAVA_RUNTIME_ENVIRONMENT_INFORMATION.javaRuntimeName],
                java_runtime_version: data[SYSTEM_INFO_TITLE_JAVA_RUNTIME_ENVIRONMENT_INFORMATION.parent_name][SYSTEM_INFO_TITLE_JAVA_RUNTIME_ENVIRONMENT_INFORMATION.javaRuntimeVersion],
                username: data[SYSTEM_INFO_TITLE_JAVA_RUNTIME_ENVIRONMENT_INFORMATION.parent_name][SYSTEM_INFO_TITLE_JAVA_RUNTIME_ENVIRONMENT_INFORMATION.userName],
                system_language: data[SYSTEM_INFO_TITLE_JAVA_RUNTIME_ENVIRONMENT_INFORMATION.parent_name][SYSTEM_INFO_TITLE_JAVA_RUNTIME_ENVIRONMENT_INFORMATION.systemLanguage],
                system_timezone: data[SYSTEM_INFO_TITLE_JAVA_RUNTIME_ENVIRONMENT_INFORMATION.parent_name][SYSTEM_INFO_TITLE_JAVA_RUNTIME_ENVIRONMENT_INFORMATION.systemTimezone],
                file_system_encoding: data[SYSTEM_INFO_TITLE_JAVA_RUNTIME_ENVIRONMENT_INFORMATION.parent_name][SYSTEM_INFO_TITLE_JAVA_RUNTIME_ENVIRONMENT_INFORMATION.fileSystemEncoding],
                user_directory: data[SYSTEM_INFO_TITLE_JAVA_RUNTIME_ENVIRONMENT_INFORMATION.parent_name][SYSTEM_INFO_TITLE_JAVA_RUNTIME_ENVIRONMENT_INFORMATION.userDirectory],
                temp_directory: data[SYSTEM_INFO_TITLE_JAVA_RUNTIME_ENVIRONMENT_INFORMATION.parent_name][SYSTEM_INFO_TITLE_JAVA_RUNTIME_ENVIRONMENT_INFORMATION.tempDirectory],
                HealthFacilityFosid: data?.fosid
            })

            let javaRuntimeEnvironmentInformation = await JavaRuntimeEnvironmentInformation.findOne({ where: { HealthFacilityFosid: data.fosid } })

            if (javaRuntimeEnvironmentInformation) {
                javaRuntimeEnvironmentInformation.operating_system = incomingJavaRuntimeEnvironmentInformation.operating_system
                javaRuntimeEnvironmentInformation.operating_system_arch = incomingJavaRuntimeEnvironmentInformation.operating_system_arch
                javaRuntimeEnvironmentInformation.operating_system_version = incomingJavaRuntimeEnvironmentInformation.operating_system_version
                javaRuntimeEnvironmentInformation.javaVersion = incomingJavaRuntimeEnvironmentInformation.javaVersion
                javaRuntimeEnvironmentInformation.java_vendor = incomingJavaRuntimeEnvironmentInformation.java_vendor
                javaRuntimeEnvironmentInformation.jvm_version = incomingJavaRuntimeEnvironmentInformation.jvm_version
                javaRuntimeEnvironmentInformation.jvm_vendor = incomingJavaRuntimeEnvironmentInformation.jvm_vendor
                javaRuntimeEnvironmentInformation.java_runtime_name = incomingJavaRuntimeEnvironmentInformation.java_runtime_name
                javaRuntimeEnvironmentInformation.java_runtime_version = incomingJavaRuntimeEnvironmentInformation.java_runtime_version
                javaRuntimeEnvironmentInformation.username = incomingJavaRuntimeEnvironmentInformation.username
                javaRuntimeEnvironmentInformation.system_language = incomingJavaRuntimeEnvironmentInformation.system_language
                javaRuntimeEnvironmentInformation.system_timezone = incomingJavaRuntimeEnvironmentInformation.system_timezone
                javaRuntimeEnvironmentInformation.file_system_encoding = incomingJavaRuntimeEnvironmentInformation.file_system_encoding
                javaRuntimeEnvironmentInformation.user_directory = incomingJavaRuntimeEnvironmentInformation.user_directory
                javaRuntimeEnvironmentInformation.temp_directory = incomingJavaRuntimeEnvironmentInformation.temp_directory
            } else {
                javaRuntimeEnvironmentInformation = await incomingJavaRuntimeEnvironmentInformation.save();
            }


            await javaRuntimeEnvironmentInformation.save();
            return { status: 201, message: "openmrs JavaRuntimeEnvironment  updated successfull", javaRuntimeEnvironmentInformation }
        } catch (error) {
            throw new Error(error.message)
        }
    }

    UpdateMemoryInformation = async (data) => {
        try {

            const incomingMemoryInformation = new MemoryInformation({
                total_memory: data[MEMORY_INFORMATION.parent_name][MEMORY_INFORMATION.totalMemory],
                free_memory: data[MEMORY_INFORMATION.parent_name][MEMORY_INFORMATION.freeMemory],
                maximum_heap_size: data[MEMORY_INFORMATION.parent_name][MEMORY_INFORMATION.maximumHeapSize],
                HealthFacilityFosid: data?.fosid
            })

            let memoryInformation = await MemoryInformation.findOne({ where: { HealthFacilityFosid: data.fosid } })

            if (memoryInformation) {
                memoryInformation.total_memory = incomingMemoryInformation.total_memory;
                memoryInformation.free_memory = incomingMemoryInformation.free_memory;
                memoryInformation.maximum_heap_size = incomingMemoryInformation.maximum_heap_size;

            } else {
                memoryInformation = await incomingMemoryInformation.save();
            }
            return { status: 201, message: "openmrs memory information updated successfull", memoryInformation }
        } catch (error) {
            throw new Error(error.message)
        }
    }

    UpdateDataBaseInformation = async (data) => {
        try {
            const incomingDataBaseInformation = new DataBaseInformation({
                name: data[SYSTEM_INFO_TITLE_DATABASE_INFORMATION.parent_name][SYSTEM_INFO_TITLE_DATABASE_INFORMATION.name],
                connection_url: data[SYSTEM_INFO_TITLE_DATABASE_INFORMATION.parent_name][SYSTEM_INFO_TITLE_DATABASE_INFORMATION.connectionURL],
                username: data[SYSTEM_INFO_TITLE_DATABASE_INFORMATION.parent_name][SYSTEM_INFO_TITLE_DATABASE_INFORMATION.userName],
                driver: data[SYSTEM_INFO_TITLE_DATABASE_INFORMATION.parent_name][SYSTEM_INFO_TITLE_DATABASE_INFORMATION.driver],
                dialect: data[SYSTEM_INFO_TITLE_DATABASE_INFORMATION.parent_name][SYSTEM_INFO_TITLE_DATABASE_INFORMATION.dialect],
                HealthFacilityFosid: data?.fosid
            })

            let dataBaseInformation = await DataBaseInformation.findOne({ where: { HealthFacilityFosid: data.fosid } })

            if (dataBaseInformation) {
                dataBaseInformation.name = incomingDataBaseInformation.name
                dataBaseInformation.connection_url = incomingDataBaseInformation.connection_url
                dataBaseInformation.username = incomingDataBaseInformation.username
                dataBaseInformation.driver = incomingDataBaseInformation.driver
                dataBaseInformation.dialect = incomingDataBaseInformation.dialect
                await dataBaseInformation.save();
            } else {
                dataBaseInformation = await incomingDataBaseInformation.save();
            }
            return { status: 201, message: "openmrs database information updated successfull", dataBaseInformation }
        } catch (error) {
            throw new Error(error.message)
        }
    }

    UpdateModuleInformation = async (data) => {
        try {
            const fosid = data.fosid;
            data[SYSTEM_INFO_TITLE_MODULE_INFORMATION.parent_name]?.map(async (item) => {
                const foundmodule = await Module.findOne({ where: { healthFacilityFosid: fosid, name: item.name } })

                if (foundmodule?.version !== undefined && foundmodule?.version !== item?.version) {
                    foundmodule.version = item.version;
                    await foundmodule.save();
                }

                if (!foundmodule) {
                    let module = new Module(item)
                    module.healthFacilityFosid = fosid;
                    await module.save();
                }
            })
            return { status: 200, message: "openmrs module version checked and updated successfull" }
        } catch (error) {
            throw new Error(error.message)
        }
    }


    facilityInfo = async (fosid) => {
        try {
            if (fosid) {
                return await HealthFacility.findAll({ include: [Module, OpenmrsInformation, JavaRuntimeEnvironmentInformation, MemoryInformation, DataBaseInformation], attributes: { exclude: ['password', 'hie_password', 'hie_password', 'avatar'] }, where: { fosid } });
            }
            return await HealthFacility.findAll({ include: [Module, OpenmrsInformation, JavaRuntimeEnvironmentInformation, MemoryInformation, DataBaseInformation], attributes: { exclude: ['hie_password', 'hie_password'] } });
        } catch (error) {
            throw new Error(error.message)
        }
    }
}

module.exports = Service;
