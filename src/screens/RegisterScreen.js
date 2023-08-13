import React, { useState } from 'react';
import { ScrollView, View, TextInput, StyleSheet, Text, TouchableOpacity, Switch, Button } from 'react-native';
import { getAccessToken } from '../../redux/actions';
const Signup = ({ navigation }) => {
  const [isChecked, setIsChecked] = useState(false);
  const [phoneNumber, setphoneNumber] = useState('');
  const [FirstName, setFirstName] = useState('');
  const [parentFirstName, setPFirstName] = useState('');
  const [LastName, setLastName] = useState('');
  const [parentLastName, setPLastName] = useState('');
  //const [BirthDate, setBirthDate] = useState('');
  const [Phone, setMobileNumber] = useState('');
  const [parentPhone, setPMobileNumber] = useState('');
  const [Email, setEmail] = useState('');
  const [parentEmail, setPEmail] = useState('');
  const [Password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [parentpassword, setParentPassword] = useState('');
  const [confirmParentPassword, setConfirmParentPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [ChildFirstName, setChildFirstName] = useState('');
  const [ChildLastName, setChildLastName] = useState('');
  const [Childpassword, setChildpassword] = useState('');
  const [isValid, setIsValid] = useState('');
  const [ischildValid, setIsChildValid] = useState('');
  const [isSecchildValid, setIsSecChildValid] = useState('');
  const handlephoneNumber = (text) => {
    setphoneNumber(text);
  }
  const handlePasswordChange = (text) => {
    setPassword(text);
    setChildpassword(text);
    setIsChildValid(validatechildPassword(text))
    setIsSecChildValid(validateSecchildPassword(text))
  };
  const handleParentPasswordChange = (text) => {
    setParentPassword(text);
    setIsValid(validatePassword(text));
  };
  const handleConfirmPasswordChange = (text) => {
    setConfirmPassword(text);
  };
  const handleConfirmParentPasswordChange = (text) => {
    setConfirmParentPassword(text);
  };

  const handleFirstUsernameChange = (text) => {
    setFirstName(text);
    setChildFirstName(text);
  };
  const handleLastUsernameChange = (text) => {
    setLastName(text);
    setChildLastName(text);
  };
  const handlePFirstUsernameChange = (text) => {
    setPFirstName(text);
  };
  const handlePLastUsernameChange = (text) => {
    setPLastName(text);
  };
  // const handleDateOfBirthChange = (text) => {
  //   setBirthDate(text);
  // };

  const handleMobileNumberChange = (text) => {
    setMobileNumber(text);
  };
  const handlePMobileNumberChange = (text) => {
    setPMobileNumber(text);
  };

  const handleEmailChange = (text) => {
    setEmail(text);
  };
  const handlePEmailChange = (text) => {
    setPEmail(text);
  };

  const validatePassword = (parentpassword) => {
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/;
    return passwordRegex.test(parentpassword)
  }

  const validatechildPassword = (Password) => {
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/;
    return passwordRegex.test(Password)

  }
  const validateSecchildPassword = (Childpassword) => {
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/;
    return passwordRegex.test(Childpassword);
  }

  const handleSubmit = async () => {
    // if (!parentPhone || parentPhone.length !== 10 || !/^\d+$/.test(parentPhone)) {
    //   alert('Please enter a valid 10-digit mobile number for the parent');
    //   return;
    // }

    if (!Phone || Phone.length !== 10 || !/^\d+$/.test(Phone)) {
      alert('Please enter a valid 10-digit mobile number for the student');
      return;
    }

    // if (!parentEmail || !/\S+@\S+\.\S+/.test(parentEmail)) {
    //   alert('Please enter a valid email address for the parent');
    //   return;
    // }

    if (!Email || !/\S+@\S+\.\S+/.test(Email)) {
      alert('Please enter a valid email address for the student');
      return;
    }

    // if (!parentLastName) {
    //   alert('Please enter the last name of the parent');
    //   return;
    // }

    // if (!LastName) {
    //   alert('Please enter the last name of the student');
    //   return;
    // }
    // if (Password !== confirmPassword && parentpassword !==confirmParentPassword) {
    //   setPasswordError('Passwords do not match.');
    // } 
    let data = {};
    data.phoneNumber = phoneNumber;
    data.Phone = parentPhone;
    // data.BirthDate = BirthDate;
    data.FirstName = parentFirstName;
    data.LastName = parentLastName;
    data.Email = parentEmail;
    data.parentFirstName = FirstName;
    data.parentLastName = LastName;
    data.parentEmail = Email;
    data.parentPhone = Phone;
    data.password = Password;
    data.parentPassword = parentpassword;

    const body = {
      "parent": {
        "parentFirstName": parentFirstName,
        "parentLastName": parentLastName,
        "parentEmail": parentEmail,
        "parentPhone": parentPhone,
        "parentPassword": parentpassword
      },
      "child": {
        "FirstName": FirstName,
        "LastName": LastName,
        "Email": Email,
        "Phone": Phone,
        "Password": Password
      }
    };


    // const body = JSON.stringify(data);


    //const token = `00D2w00000MDKYS!AQQAQB3E35smxBBCTUAF.1hrwHENO6mFEVLMCmh7cX3y3GGAq3APD2Vdwgv3Ln6EWr0pIX_ycP1a6S2_CmzB2wMcfQA9915.`;
    const token = await getAccessToken();
    console.log('token........>' + token);
    console.log('body...>' + JSON.stringify(body));
    const bearer = 'Bearer ' + token;
    console.log('bearer------>' + bearer);
    try {
      const response = await fetch(
        'https://languageveda--developer.sandbox.my.salesforce.com/services/apexrest/createParentOrChildContact', {
        method: 'POST',
        headers: {
          //Accept: 'application/json',
          'Content-Type': 'application/json',
          'Authorization': bearer
        },
        body: JSON.stringify(body),

      });
      const json = await response.json();
      console.log('response for parentChildContant :::', json)
      if (response.ok) {
        alert('Registration successful!');

        setFirstName("");
        setLastName("");
        setPFirstName("");
        setPLastName("");

        // const handleDateOfBirthChange = (text) => {
        //   setBirthDate(text);
        // };
        setMobileNumber("");
        setPMobileNumber("");
        setEmail("");
        setPEmail("");
        //history.go(-1);
        navigation.navigate('CommunityScreen');

      } else {
        alert('Registration failed. Please try again.');
        console.log('json--->' + JSON.stringify(json));
      }
      // If response is a text use the below line
      //const text = await response.text();
      return json;
    } catch (error) {
      console.error(error);
    }

  }

  const handleChildSubmit = async () => {
    if (!Phone || Phone.length !== 10 || !/^\d+$/.test(Phone)) {
      alert('Please enter a valid 10-digit mobile number for the student');
      return;
    }

    if (!Email || !/\S+@\S+\.\S+/.test(Email)) {
      alert('Please enter a valid email address for the student');
      return;
    }


    // let data = {};
    // // data.phoneNumber = phoneNumber;
    // // data.Phone = parentPhone;
    // // data.BirthDate = BirthDate;
    // // data.FirstName = parentFirstName;
    // // data.LastName = parentLastName;
    // // data.Email = parentEmail;
    // data.ChildFirstName = ChildFirstName;
    // data.ChildLastName = ChildLastName;
    // data.ChildEmail = Email;
    // data.ChildPhone = Phone;
    // data.password = Password;
    // data.ChildPassword = Childpassword;

    const body = {
      "phoneNumber": phoneNumber,
      "child": {
        "FirstName": ChildFirstName,
        "LastName": ChildLastName,
        "Email": Email,
        "Phone": Phone,
        "Password": Childpassword
      }
    };


    // const body = JSON.stringify(data);


    //const token = `00D2w00000MDKYS!AQQAQB3E35smxBBCTUAF.1hrwHENO6mFEVLMCmh7cX3y3GGAq3APD2Vdwgv3Ln6EWr0pIX_ycP1a6S2_CmzB2wMcfQA9915.`;
    const token = await getAccessToken();
    console.log('token........>' + token);
    console.log('body...>' + JSON.stringify(body));
    const bearer = 'Bearer ' + token;
    console.log('bearer------>' + bearer);
    try {
      const response = await fetch(
        'https://languageveda--developer.sandbox.my.salesforce.com/services/apexrest/create-ChildContact', {
        method: 'POST',
        headers: {
          //Accept: 'application/json',
          'Content-Type': 'application/json',
          'Authorization': bearer
        },
        body: JSON.stringify(body),

      });
      const json = await response.json();
      console.log("child api response is json", json);
      if (json == 'Error: If you are a firsttime user please register') {
        alert('You are not already registered! Please register');
        return;
      }
      if (response.ok) {
        alert('Registration successful!');


        setChildFirstName("");
        setChildLastName("");
        // const handleDateOfBirthChange = (text) => {
        //   setBirthDate(text);
        // };
        setMobileNumber("");
        // setPMobileNumber("");
        setEmail("");
        // setPEmail("");
        //history.go(-1);
        navigation.navigate('CommunityScreen');

      } else {
        alert('Registration failed. Please try again.');
        console.log('json--->' + JSON.stringify(json));
      }
      // If response is a text use the below line
      //const text = await response.text();
      return json;
    } catch (error) {
      console.error(error);
    }

  }
  return (
    <ScrollView>
      <View style={styles.container}>
        <View>
          <Switch
            value={isChecked}
            onValueChange={() => setIsChecked(!isChecked)}
          />
          <Text style={{ color: "#030bfc", fontWeight: "bold" }}>{isChecked ? 'Registered Parent' : 'NonRegistered Parent'}</Text>
        </View>
      </View>

      {!isChecked ?

        (
          <View style={styles.container}>
            {/* <TextInput
          style={styles.input}
          placeholder="Enter Phone number"
          onChangeText={text => handlephoneNumber(text)}
          value={phoneNumber}
          placeholderTextColor={"#6c86f0"}
        /> */}
            <Text style={{ color: "#030bfc", fontWeight: "bold" }}>Parent Details</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter user First name"
              onChangeText={text => handlePFirstUsernameChange(text)}
              value={parentFirstName}
              placeholderTextColor={"#6c86f0"}
            />
            <TextInput
              style={styles.input}
              placeholder="Enter user Last name"
              onChangeText={text => handlePLastUsernameChange(text)}
              value={parentLastName}
              placeholderTextColor={"#6c86f0"}
            />
            <TextInput
              style={styles.input}
              placeholder="Enter mobile number"
              keyboardType="number-pad"
              onChangeText={text => handlePMobileNumberChange(text)}
              value={parentPhone}
              placeholderTextColor={"#6c86f0"}
            />
            <TextInput
              style={styles.input}
              placeholder="Enter email"
              keyboardType="email-address"
              onChangeText={text => handlePEmailChange(text)}
              value={parentEmail}
              placeholderTextColor={"#6c86f0"}
            />

            <TextInput
              style={styles.input}
              placeholder="Password"
              secureTextEntry
              onChangeText={text => handleParentPasswordChange(text)}
              value={parentpassword}
              placeholderTextColor={"#6c86f0"}
            />
            {!isValid && parentpassword.length > 0 ? (
              <Text style={{ color: "red", fontSize: 13 }}>Password must contain 8 characters, 1 uppercase,1 lowercase, 1 number and 1 special character</Text>
            ) : null}
            <TextInput
              style={styles.input}
              placeholder="ConfirmPassword"
              secureTextEntry
              onChangeText={text => handleConfirmParentPasswordChange(text)}
              value={confirmParentPassword}
              placeholderTextColor={"#6c86f0"}
            />
            {parentpassword != confirmParentPassword && confirmParentPassword.length > 0 ? <Text style={{ color: "red", marginRight: "60%" }}> Password didn't match</Text> : null}

            {/* {passwordError ? <Text>{passwordError}</Text> : null} */}


            <Text style={{ color: "#030bfc", fontWeight: "bold" }}>Child Details</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter user First name"
              onChangeText={text => handleFirstUsernameChange(text)}
              value={FirstName}
              placeholderTextColor={"#6c86f0"}
            />
            <TextInput
              style={styles.input}
              placeholder="Enter user Last name"
              onChangeText={text => handleLastUsernameChange(text)}
              value={LastName}
              placeholderTextColor={"#6c86f0"}
            />
            <TextInput
              style={styles.input}
              placeholder="Enter mobile number"
              keyboardType="number-pad"
              onChangeText={text => handleMobileNumberChange(text)}
              value={Phone}
              placeholderTextColor={"#6c86f0"}
            />
            {/* <TextInput
        style={styles.input}
        placeholder="Enter date of birth (DDMMYYYY)"
        keyboardType="number-pad"
        onChangeText={text => handleDateOfBirthChange(text)}
        value={BirthDate}
      /> */}
            <TextInput
              style={styles.input}
              placeholder="Enter email"
              keyboardType="email-address"
              onChangeText={text => handleEmailChange(text)}
              value={Email}
              placeholderTextColor={"#6c86f0"}
            />
            <TextInput
              style={styles.input}
              placeholder="Password"
              secureTextEntry
              onChangeText={text => handlePasswordChange(text)}
              value={Password}
              placeholderTextColor={"#6c86f0"}
            />
            {!ischildValid && Password.length > 0 ? (
              <Text style={{ color: "red", fontSize: 13 }}>Password must contain 8 characters, 1 uppercase,1 lowercase, 1 number and 1 special character</Text>
            ) : null}
            <TextInput
              style={styles.input}
              placeholder="ConfirmPassword"
              secureTextEntry
              onChangeText={text => handleConfirmPasswordChange(text)}
              value={confirmPassword}
              placeholderTextColor={"#6c86f0"}
            />
            {Password != confirmPassword && confirmPassword.length > 0 ? <Text style={{ color: "red", marginRight: "60%" }}> Password didn't match</Text> : null}

            {/* {passwordError ? <Text>{passwordError}</Text> : null} */}
            <TouchableOpacity style={styles.RegisterBtnStyle} onPress={() => handleSubmit()}>
              <Text style={{ color: '#030bfc', fontWeight: '700', padding: 12, fontSize: 18, textAlign: 'center' }}>Register</Text>
            </TouchableOpacity>


          </View>
        )
        :

        (<View style={styles.container} >
          <TextInput
            style={styles.input}
            placeholder="Enter Phone number"
            onChangeText={text => handlephoneNumber(text)}
            value={phoneNumber}
            placeholderTextColor={"#6c86f0"}
          />
          <Text style={{ color: "#030bfc", fontWeight: "bold" }}>Child Details</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter user First name"
            onChangeText={text => handleFirstUsernameChange(text)}
            value={FirstName}
            placeholderTextColor={"#6c86f0"}
          />
          <TextInput
            style={styles.input}
            placeholder="Enter user Last name"
            onChangeText={text => handleLastUsernameChange(text)}
            value={LastName}
            placeholderTextColor={"#6c86f0"}
          />
          <TextInput
            style={styles.input}
            placeholder="Enter mobile number"
            keyboardType="number-pad"
            onChangeText={text => handleMobileNumberChange(text)}
            value={Phone}
            placeholderTextColor={"#6c86f0"}
          />
          {/* <TextInput
        style={styles.input}
        placeholder="Enter date of birth (DDMMYYYY)"
        keyboardType="number-pad"
        onChangeText={text => handleDateOfBirthChange(text)}
        value={BirthDate}
      /> */}
          <TextInput
            style={styles.input}
            placeholder="Enter email"
            keyboardType="email-address"
            onChangeText={text => handleEmailChange(text)}
            value={Email}
            placeholderTextColor={"#6c86f0"}
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            secureTextEntry
            onChangeText={text => handlePasswordChange(text)}
            value={Password}
            placeholderTextColor={"#6c86f0"}
          />
          {!isSecchildValid && Password.length > 0 ? (
            <Text style={{ color: "red", fontSize: 13 }}>Password must contain 8 characters, 1 uppercase,1 lowercase, 1 number and 1 special character</Text>
          ) : null}
          <TextInput
            style={styles.input}
            placeholder="ConfirmPassword"
            secureTextEntry
            onChangeText={text => handleConfirmPasswordChange(text)}
            value={confirmPassword}
            placeholderTextColor={"#6c86f0"}
          />
          {Password != confirmPassword && confirmPassword.length > 0 ? <Text style={{ color: "red", marginRight: "60%" }}> Password didn't match</Text> : null}

          {/* {passwordError ? <Text>{passwordError}</Text> : null} */}
          <TouchableOpacity style={styles.RegisterBtnStyle} onPress={() => handleChildSubmit()}>
            <Text style={{ color: '#030bfc', fontWeight: '700', padding: 12, fontSize: 18, textAlign: 'center' }}>Register</Text>
          </TouchableOpacity>

        </View>)

      }



    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    borderColor: 'red',
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    margin: 10,
    padding: 10,
    borderRadius: 15,
    borderColor: "#a3c3f0"
  },
  RegisterBtnStyle: {
    backgroundColor: "#8282e8",
    borderRadius: 20,
    width: "50%",
    alignSelf: "center"
  }
});
export default Signup;