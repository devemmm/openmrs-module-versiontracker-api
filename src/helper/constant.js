const SYSTEM_TITLE_OPENMRS_INFORMATION = {
    parent_name: 'SystemInfo.title.openmrsInformation',
    systemDate: 'SystemInfo.OpenMRSInstallation.systemDate',
    systemTime: 'SystemInfo.OpenMRSInstallation.systemTime',
    openmrsVersion: 'SystemInfo.OpenMRSInstallation.openmrsVersion',
    hostname: 'SystemInfo.hostname'
}


const SYSTEM_INFO_TITLE_JAVA_RUNTIME_ENVIRONMENT_INFORMATION = {
    parent_name: "SystemInfo.title.javaRuntimeEnvironmentInformation",
    operatingSystem: "SystemInfo.JavaRuntimeEnv.operatingSystem",
    operatingSystemArch: "SystemInfo.JavaRuntimeEnv.operatingSystemArch",
    operatingSystemVersion: "SystemInfo.JavaRuntimeEnv.operatingSystemVersion",
    javaVersion: "SystemInfo.JavaRuntimeEnv.javaVersion",
    javaVendor: "SystemInfo.JavaRuntimeEnv.javaVendor",
    jvmVersion: "SystemInfo.JavaRuntimeEnv.jvmVersion",
    jvmVendor: "SystemInfo.JavaRuntimeEnv.jvmVendor",
    javaRuntimeName: "SystemInfo.JavaRuntimeEnv.javaRuntimeName",
    javaRuntimeVersion: "SystemInfo.JavaRuntimeEnv.javaRuntimeVersion",
    userName: "SystemInfo.JavaRuntimeEnv.userName",
    systemLanguage: "SystemInfo.JavaRuntimeEnv.systemLanguage",
    systemTimezone: "SystemInfo.JavaRuntimeEnv.systemTimezone",
    fileSystemEncoding: "SystemInfo.JavaRuntimeEnv.fileSystemEncoding",
    userDirectory: "SystemInfo.JavaRuntimeEnv.userDirectory",
    tempDirectory: "SystemInfo.JavaRuntimeEnv.tempDirectory"
}


const MEMORY_INFORMATION = {
    parent_name: 'SystemInfo.title.memoryInformation',
    totalMemory: "SystemInfo.Memory.totalMemory",
    freeMemory: "SystemInfo.Memory.freeMemory",
    maximumHeapSize: "SystemInfo.Memory.maximumHeapSize"
}

const SYSTEM_INFO_TITLE_DATABASE_INFORMATION = {
    parent_name: 'SystemInfo.title.dataBaseInformation',
    name: 'SystemInfo.Database.name',
    connectionURL: 'SystemInfo.Database.connectionURL',
    userName: 'SystemInfo.Database.userName',
    driver: 'SystemInfo.Database.driver',
    dialect: 'SystemInfo.Database.dialect'
}

const SYSTEM_INFO_TITLE_MODULE_INFORMATION = {
    parent_name: 'SystemInfo.title.moduleInformation'
}

module.exports = { SYSTEM_TITLE_OPENMRS_INFORMATION, SYSTEM_INFO_TITLE_JAVA_RUNTIME_ENVIRONMENT_INFORMATION, MEMORY_INFORMATION, SYSTEM_INFO_TITLE_DATABASE_INFORMATION, SYSTEM_INFO_TITLE_MODULE_INFORMATION }