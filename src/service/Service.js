const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const HealthFacility = require('../module/HealthFacility')
const Module = require('../module/Module')
const User = require('../module/User')
const Token = require('../module/Token')


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
            const user = await  this.findByCredentials(email, password)
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
            console.log(healthFacility)
            await healthFacility.save()
            return { message: "Health Facility Registered successfull", healthFacility }
        } catch (error) {
            throw new Error(error.message)
        }


    }

    addUpdateModule = async (data) => {
        try {
            const fosid = data.fosid;
            const healthf = await HealthFacility.findOne({ fosid })

            if (healthf) {
                healthf.lastExcutedPeriod = new Date()
                await healthf.save();
            }
            data?.info.map(async (item) => {
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
            return { status: 200, message: "module version checked and updated successfull" }
        } catch (error) {
            throw new Error(error.message)
        }
    }
    facilityInfo = async (fosid) => {
        try {
            if (fosid) {
                return await HealthFacility.findAll({ include: Module, attributes: { exclude: ['password', 'hie_password', 'hie_password', 'avatar'] }, where: { fosid } });
            }
            return await HealthFacility.findAll({ include: Module, attributes: { exclude: ['hie_password', 'hie_password'] } });
        } catch (error) {
            throw new Error(error.message)
        }
    }
}

module.exports = Service;
