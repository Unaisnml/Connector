export function userReducer(state="Unais",action){
    switch (action.type) {
        case "LOGIN":
            return action.payload
            
    
        default:
            return state
    }
}