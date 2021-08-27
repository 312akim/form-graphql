import React, { ReactNode } from 'react';
import { useForm } from "react-hook-form";

interface FormValues {
    email: string,
    username: string,
    password: string,
    firstName: string,
    branchNum: number,
    stateOption: string,
    modeOption: string,
}

const FormComponent = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<FormValues>()

    return (
        <div style={styles.formComponentWrapper}>
            <form 
                onSubmit={handleSubmit((data) => {
                    console.log(data);
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
                        }
                    })}/>
                    {errors.email && <div>{errors.email.message}</div>}
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
                    {errors.username && <div>{errors.username.message}</div>}
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
                    {errors.password && <div>{errors.password.message}</div>}
                </FormInputWrapper>

                <FormInputWrapper>
                    <label htmlFor="firstName">First Name:</label>
                    <input id="firstName" {...register("firstName")}/>
                </FormInputWrapper>

                <FormInputWrapper>
                    <label htmlFor="branchNum">Branch Number</label>
                    <input id="branchNum" {...register("branchNum", { 
                        valueAsNumber: true,
                    })}/>
                    {errors.branchNum && <div>{errors.branchNum.message}</div>}
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
                    {errors.stateOption && <div>{errors.stateOption.message}</div>}
                </FormInputWrapper>

                <FormInputWrapper>
                    <label  htmlFor="modeOption">Light or Dark Mode?</label>
                    <select {...register("modeOption", {
                        required: "Selection Required"
                    })} id="modeOption">
                        <option value="">Make a selection</option>
                        <option value="light">Light!</option>
                        <option value="dark">Dark!</option>
                    </select>
                    {errors.modeOption && <div>{errors.modeOption.message}</div>}
                </FormInputWrapper>

                <FormInputWrapper>
                    <input type="Submit"></input>
                </FormInputWrapper>
            </form>
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
    },
    formComponent: {
        display: 'flex',
        flexDirection: 'column' as const,
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
        flexDirection: 'column' as const,
        margin: '8px',
    },
}

export default FormComponent;