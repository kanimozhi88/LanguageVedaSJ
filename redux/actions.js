import { firebase } from "@react-native-firebase/analytics";
import { GET_API,GET_LASTNAME,GET_COURSEAPIRESULT,GET_LOGINOTPSTATUS,GET_CHARTSAPIRESULT,GET_LOGINSTATUS,GET_CALENDERAPIRESULT,GET_ASSIGNMENTAPIRESULT, GET_EMAIL,GET_PHONE, GET_RECORD_TYPE, GET_PROFILEPHOTO} from "./actionType";
//import remoteConfig from '@react-native-firebase/remote-config';
import { correctFloat } from "highcharts";
// export async function connectedApp(){
//     return new Promise((resolve,reject)=>{
//         let details={};
//         try{
//             remoteConfig().setConfigSettings({
//                 minimumFetchIntervalMillis: 3600000, // 1 hour
//               });
//               remoteConfig().setDefaults({
//                 myParam: 'default value',
//               });
//               // Fetch the latest parameter values from Firebase Remote Config
//               remoteConfig()
//             .fetch()
//             .then(() => {
//               // Activate the fetched values
//               remoteConfig().fetchAndActivate();
//               //remoteConfig().activate();
//               // Get the new parameter value
//               details.grant_type = remoteConfig().getValue('grant_type').asString();
//               details.client_id = remoteConfig().getValue('client_id').asString();
//               details.client_secret = remoteConfig().getValue('client_secret').asString();
//               details.username = remoteConfig().getValue('username').asString();
//               details.password = remoteConfig().getValue('password').asString();
//               resolve(details);
//             });
//         } catch(error){
//             console.log('Identified error---->',error);
//             resolve(details);
    
//         }
//     })
    
// }
export const getRecordType = result =>({
    type : GET_RECORD_TYPE,
    payload: result
})
export const getDataMethod = result =>({

    type: GET_API,
    payload: result
});
export const getLoginStatus = result =>({

    type: GET_LOGINSTATUS,
    payload: result
});
export const getLoginOtpStatus = result =>({

    type: GET_LOGINOTPSTATUS,
    payload: result
});
export const getLastNameMethod = result =>({

    type: GET_LASTNAME ,
    payload: result
});
export const getPhoneMethod = result =>({

    type: GET_PHONE ,
    payload: result
});
export const getEmailMethod = result =>({

    type: GET_EMAIL ,
    payload: result
});
export const getProfilePhotoMethod = result =>({

    type: GET_PROFILEPHOTO ,
    payload: result
});
export const getCourseApiResult= response =>({
    type: GET_COURSEAPIRESULT,
    payload:response

});
export const getCalenderApiResult= response =>({
    type:GET_CALENDERAPIRESULT,
    payload:response

});
export const getAssignmentApiResult= response =>({
    type:GET_ASSIGNMENTAPIRESULT,
    payload:response

});
export const getChartApiResult = result =>({

    type: GET_CHARTSAPIRESULT,
    payload: result
});

export async function getAccessToken() {
    try {
        var details = {
            'grant_type': 'password',
            'client_id': '3MVG9ZUGg10Hh224dLrl9wXsHAMsIEMCA2YdbSy4TTWzag18glt0P9h3gNxmBvrXfnFE4LPkJ6I.Z8KjVEafI',
            'client_secret': '1F72B06A4D12E374B8B4857F60BC02BB2C9536E9CB6BD210C2C72AE2405E6066',
            'username': 'santhosh-d1y1@force.com.uat',
            'password': 'Pass4LV#2108'
        };
        const calloutURL = "https://test.salesforce.com/services/oauth2/token";
        //const calloutURL="https://https://languageveda--uat\.sandbox\.my\.salesforce\.com/services/oauth2/token";
        var formBody = [];
        for (var property in details) {
            var encodedKey = encodeURIComponent(property);
            var encodedValue = encodeURIComponent(details[property]);
            formBody.push(encodedKey + "=" + encodedValue);
        }
        formBody = formBody.join("&");
        const response = await fetch(calloutURL, {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/x-www-form-urlencoded"
            },
            body: formBody
        });

        const json = await response.json();

        return !!json && !!json.access_token ? json.access_token : null;
    } catch (error) {
        console.log(`Error -> ${error}`)
        return null;
    }
}
