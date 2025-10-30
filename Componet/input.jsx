import { TextInput, View } from "react-native";

const InputComponent =( icon, renderIcon) =>{

    return(
        <View style={{borderColor: 'grey', 
            borderWidth: 2
        , flexDirection:'row',
            alignItems:'center', justifyContent:'space-between',
            paddingRight:0, padding: 10,
            borderRadius:8, 
        }}>
            <TextInput >
                {
                    renderIcon && icon
                }

            </TextInput>
        </View>
    )
}

export default InputComponent;