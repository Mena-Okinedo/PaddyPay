import{TouchableOpacity, Text, Alert} from "react-native"

const Button =({text, buttonStyle, onPress}) =>{

    return(
        <TouchableOpacity  onPress={(onPress)}

        
        style={{
            backgroundColor:'black',
           borderRadius: 50,
           height:58,
           padding: 15,
           justifyContent:'center',
           alignItems: 'center',
           marginVertical: 10,
           borderWidth:2,
           borderColor: 'red',
           ...buttonStyle

            
        }}>
            <Text style={{color: 'white', textAlign:'center', fontWeight:'bold',
                fontSize: 20, borderColor: 'blue'
            }}>
                {text }
            </Text>
        </TouchableOpacity>
    )

}
export default Button;