import { act } from "react-test-renderer";
import { GET_API, GET_LASTNAME, GET_COURSEAPIRESULT,GET_LOGINSTATUS } from "./actionType";

const initialState = {
    // counter: 0,
    recordId: '',
    status: '',
    LastName: '',
    Phone:'',
    Email: '',
    Result: undefined,
    ChartResult: undefined,
    calendarApiResp: undefined,
    AssignmentApiResult: undefined,
    recordType: '',
    profilePhoto: undefined,

}
export const ApiResponse = (state = initialState, action) => {
    switch (action.type) {
        case 'GET_API':
            return {
                ...state,
                recordId: action.payload,
               
            };
            case 'GET_LOGINSTATUS':
            return {
                ...state,
                status: action.payload,
               
            };

            case 'GET_RECORD_TYPE':
            return {
                ...state,
                recordType: action.payload,
               
            };
        case 'GET_LASTNAME':
            return {
                ...state,
                LastName: action.payload,
                
            };
            case 'GET_PHONE':
            return {
                ...state,
                Phone: action.payload,
                
            };
            case 'GET_PROFILEPHOTO':
                return {
                    ...state,
                    profilePhoto: action.payload,
                    
                };
            case 'GET_EMAIL':
            return {
                ...state,
                Email: action.payload,
                
            };
        case 'GET_COURSEAPIRESULT':
            return {
                ...state,
                Result: action.payload
            }
            case 'GET_ASSIGNMENTAPIRESULT':
            return {
                ...state,
                AssignmentApiResult: action.payload
            }
        case 'GET_CHARTSAPIRESULT':
            return {
                ...state,
                ChartResult: action.payload

            }
            case 'GET_CALENDERAPIRESULT':
                return{
                      ...state,
                      calendarApiResp: action.payload
                }

        default:
            return state;
    }

};