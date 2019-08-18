import Alert from "../models/Alert.js";
import User from "../models/User.js";
import showErr from '../utils/showErr';
import { ALERT_ERR } from "../constants";
import { districtNameFormatter } from "../utils/districtNameFormatter";
import { typeFormatter } from "../utils/typeFormatter";
import axios from 'axios';
import { getAverage } from '../utils/getAverage';

export default {
	Query: {
		getAverage: async (_, { districtName }) => {
			const alerts = await Alert.find({ geo: districtNameFormatter(districtName) })
			return getAverage(alerts)
		},
		allAlerts: async () => {
			try {
				const alerts = await Alert.find({}).populate("user")
				return alerts
			} catch (err) {
				console.log(err)
			}
		},
		alerts: async (_, { districtName }) => {
			try {
				const alerts = Alert.find({ geo: districtNameFormatter(districtName) }).populate("user")
				return alerts
			} catch (err) {
				console.log(err)
			}
		},
		types: async (_, { type }) => {
			try {
				const alerts = Alert.find({ type: typeFormatter(type) }).populate("user")
				return alerts
			} catch (err) {
				console.log(err)
			}
		}
	},
	Mutation: {
		createAlert: async (_, { type, description, lat, long, userId }, { user }) => {
			const geoUrl = `http://www.geoplugin.net/extras/location.gp?lat=${lat}&lon=${long}&format=json`
			const res = await axios.get(geoUrl)
			try {
				const alert = await new Alert({ type, description, lat, long, geo: res.data.geoplugin_region, place: res.data.geoplugin_place })
				if (user) {
					const currentUser = await User.findById(user.id)
					alert.user = currentUser
					await alert.save(alert)
					currentUser.alerts.push(alert)
					await currentUser.save()
					return { ok: true, alert }
				} else {
					const currentUser = await User.findById(userId)
					alert.user = currentUser
					await alert.save(alert)
					currentUser.alerts.push(alert)
					await currentUser.save()
					return { ok: true, alert }
				}
			} catch (err) {
				return showErr(false, "alert", ALERT_ERR)
			}
		}
	}
}
