import React from 'react';

const FormComponent = () => {
    return (
        <div style={styles.formComponentWrapper}>
            <form action="" style={styles.formComponent}>
                <FormInputWrapper>
                    <label>Email Address:</label>
                    <input type="text" id="email" name="email"></input>
                </FormInputWrapper>

                <FormInputWrapper>
                    <label>Username:</label>
                    <input type="text" id="username" name="username"></input>
                </FormInputWrapper>

                <FormInputWrapper>
                    <label>Password:</label>
                    <input type="text" id="password" name="password"></input>
                </FormInputWrapper>

                <FormInputWrapper>
                    <label>First Name:</label>
                    <input type="text" id="fname" name="fname"></input>
                </FormInputWrapper>

                <FormInputWrapper>
                    <label>Favorite State Manager</label>
                    <select>
                        <option value="context">Context</option>
                        <option value="redux">Redux</option>
                        <option value="mobx">MobX</option>
                        <option value="recoil">Recoil</option>
                        <option value="other">Other</option>
                    </select>
                </FormInputWrapper>

                <FormInputWrapper>
                    <label>Light or Dark Mode?</label>
                    <select>
                        <option value="light">Light!</option>
                        <option value="dark">Dark!</option>
                    </select>
                </FormInputWrapper>

                <FormInputWrapper>
                    <input type="Submit"></input>
                </FormInputWrapper>
            </form>
        </div>
    )
}

const FormInputWrapper = (props) => {
    return (
        <div style={styles.formInput}>
            {props.children}
        </div>
    )
}

const styles = {
    formComponentWrapper: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    formComponent: {
        display: 'flex',
        flexDirection: 'column',
        maxWidth: '400px',
        minWidth: '323px',
        marginTop: '150px',
        padding: '25px',
        backgroundColor: 'lightblue',
        color: 'black',
        border: '1px solid black',
        boxShadow: '3px 3px 3px darkgray',
        borderRadius: '8px',
    },
    formInput: {
        display: 'flex',
        flexDirection: 'column',
        margin: '8px',
    }
}

export default FormComponent;