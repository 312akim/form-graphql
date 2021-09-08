import React, { ReactNode, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { useForm } from 'react-hook-form';
import { createUser as CREATE_USER_MUTATION, createSurvey as CREATE_SURVEY_MUTATION, updateUser as UPDATE_USER_MUTATION } from '../graphql/mutations';
import { useMutation, gql } from '@apollo/client';

interface FormValues {
    email: string,
    username: string,
    password: string,
    firstName: string,
    stateOption: string,
    modeOption: string,
}

const FormComponent = ({handleColorTheme}: any) => {
    // React-Hook-Form
    // Optional mode: 'all' for live validation prior to form submission 
    const { register, handleSubmit, formState: { errors } } = useForm<FormValues>({mode: 'all'})
    const [userId, setUserId] = useState('');
    const [surveyId, setSurveyId] = useState('');

    // Holds previous values for change check in useEffect
    const previousIds = useRef({userId, surveyId});

    useEffect(() => {
        // Runs if both states has been changed from default
        if (previousIds.current.userId !== userId && previousIds.current.surveyId !== surveyId) {
            updateUser({
                variables: {
                    input: {
                        id: userId,
                        userSurveyResponseId: surveyId
                    }
                }
            });

            setUserId('');
            setSurveyId('');
        }

        // updateUser does not alter userId nor surveyId
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[userId, surveyId]);

    // Create User Mutation
    const [createUser, {loading: userLoading, error: userError}] = useMutation(gql(CREATE_USER_MUTATION), {
        // Update state after receiving data
        onCompleted: (data) => {
            setUserId(data.createUser.id);
        }
    });

    // Create Survey Mutation
    const [createSurvey, {loading: surveyLoading, error: surveyError}] = useMutation(gql(CREATE_SURVEY_MUTATION), {
        // Update state after receiving data
        onCompleted: (data) => {
            setSurveyId(data.createSurvey.id);
        }
    });
    
    // Update Created User w/ created Survey relation
    const [updateUser] = useMutation(gql(UPDATE_USER_MUTATION));
    
    // Create User and Survey from form Data
    const handleSubmitMutations = (data: FormValues) => {
        createUser({
            variables: {
                input: {
                    email: data.email,
                    username: data.username,
                    password: data.password,
                    firstName: data.firstName,
                }
            },
        }).then(() =>
            createSurvey({
                variables: {
                    input: {
                        stateOption: data.stateOption,
                        modeOption: data.modeOption,
                    }
                },
            }), () => console.log('Error handleSubmit promise 1!')
        )

        if (userError) {
            console.log(`user error: ${userError}`);
        }

        if (surveyError) {
            console.log(`survey error ${surveyError}`);
        }
    }

    return (
        <div style={styles.formComponentWrapper}>
            {
                userLoading || surveyLoading ? <div style={{...styles.formComponent, alignItems: 'center', fontSize: '24px'}}>Sending...</div> :
                <form 
                    onSubmit={handleSubmit((data) => {
                        handleSubmitMutations(data);
                    })}
                    style={styles.formComponent}
                >
                    <FormInputWrapper>
                        <label htmlFor="email">Email Address:</label>
                        <input id="email" {...register("email", {
                            required: "Required",
                            minLength: {
                                value: 3,
                                message: "Min 3 characters"
                            },
                            pattern: {
                                value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                                message: 'Please enter a valid email',
                            },
                        })}/>
                        {errors.email ? <div style={styles.formErrorText}>{errors.email.message}</div> : <div style={styles.formErrorText}/>}
                    </FormInputWrapper>

                    <FormInputWrapper>
                        <label htmlFor="username">Username:</label>
                        <input id="username" {...register("username", { 
                            required: true,
                            minLength: {
                                value: 3,
                                message: "Min 3 characters"
                            }
                        })}/>
                        {errors.username ? <div style={styles.formErrorText}>{errors.username.message}</div> : <div style={styles.formErrorText}/>}
                    </FormInputWrapper>

                    <FormInputWrapper>
                        <label htmlFor="password">Password:</label>
                        <input id="password" {...register("password", { 
                            required: "Required", 
                            maxLength: {
                                value: 12,
                                message: "Max 12 characters"
                            },
                            minLength: {
                                value: 6,
                                message: "Min 6 characters"
                            }
                        })}/>
                        {errors.password ? <div style={styles.formErrorText}>{errors.password.message}</div> : <div style={styles.formErrorText}/>}
                    </FormInputWrapper>

                    <FormInputWrapper>
                        <label htmlFor="firstName">First Name:</label>
                        <input id="firstName" {...register("firstName")}/>
                    </FormInputWrapper>

                    <FormInputWrapper>
                        <label htmlFor="stateOption">Favorite State Manager</label>
                        <select {...register("stateOption", {
                            required: "Selection Required"
                        }
                        )} id="stateOption">
                            <option value="">Make a selection</option>
                            <option value="context">Context</option>
                            <option value="redux">Redux</option>
                            <option value="mobx">MobX</option>
                            <option value="recoil">Recoil</option>
                            <option value="other">Other</option>
                        </select>
                        {errors.stateOption ? <div style={styles.formErrorText}>{errors.stateOption.message}</div> : <div style={styles.formErrorText}/>}
                    </FormInputWrapper>

                    <FormInputWrapper>
                        <label htmlFor="modeOption">Light or Dark Mode?</label>
                        <select {...register("modeOption", {
                            required: "Selection Required"
                        })} id="modeOption" onChange={(e) => {
                            if (e.target.value === 'dark') {
                                handleColorTheme(true) 
                            } else if (e.target.value === 'light') {
                                handleColorTheme(false)
                            }
                            return;
                        }}>
                            <option value="">Make a selection</option>
                            <option value="light">Light!</option>
                            <option value="dark">Dark!</option>
                        </select>
                        {errors.modeOption ? <div style={styles.formErrorText}>{errors.modeOption.message}</div> : <div style={styles.formErrorText}/>}
                    </FormInputWrapper>
                    <div style={styles.formButtonContainer}>
                        <StyledFormButton type="reset">Reset</StyledFormButton>
                        <StyledFormButton type="submit">Submit</StyledFormButton>    
                    </div>
                </form>
            }
        </div>
    )
}

interface Props {
    children: ReactNode | undefined;
}

const FormInputWrapper = ({children}: Props) => {
    return (
        <div style={styles.formInput}>
            {children}
        </div>
    )
}

const styles = {
    formComponentWrapper: {
        display: 'flex',
        flexDirection: 'column' as const,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: '20px',
    },
    formComponent: {
        display: 'flex',
        flexDirection: 'column' as const,
        justifyContent: 'space-around',
        height: '500px',
        width: '343px',
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
        flexDirection: 'column' as const,
        margin: '8px',
    },
    formErrorText: {
        height: '12px'
    },
    formButton: {
        height: '30px',
        width: '40%',
        margin: '8px',
        background: 'white',
    },
    formButtonContainer: {
        display: 'flex',
        flexDirection: 'row' as const,
        justifyContent: 'space-between',
        marginBottom: '15px'
    }
}

const StyledFormButton = styled.button`
    height: 30px;
    width: 40%;
    margin: 8px;
    background: lavender;
    border: 1px solid white;
    box-shadow: 2px 2px 2px black;
    font-size: 14px;
    font-weight: bold;
    :hover {
        background: white;
        border: 1px solid lavender;
    }
`

export default FormComponent;