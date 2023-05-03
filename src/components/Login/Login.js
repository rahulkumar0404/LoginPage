import React, { useState, useEffect } from 'react'
import Card from '../UI/Card/Card'
import classes from './Login.module.css'
import Button from '../UI/Button/Button'
const Login = (props) => {
    const [enteredEmail, setEnteredEmail] = useState('')
    const [emailIsvalid, setEmailIsValid] = useState()
    const [enterpassword, setEnteredPassword] = useState('')
    const [passwordIsvalid, setPasswordIsValid] = useState()
    const [formIsvalid, setFormIsValid] = useState(false)

    useEffect(() => {
        console.log('Checking the form validity')
        const identifier = setTimeout(() => {
            setFormIsValid(
                enteredEmail.includes('@') && enterpassword.trim().length > 6
            );
        }, 500)  
        // setFormIsValid(
        //     enteredEmail.includes('@') && enterpassword.trim().length > 6
        // );
        return () => {
            console.log('Clean up')
            clearTimeout(identifier)
        }
    }, [enteredEmail, enterpassword])

    const emailchangeHandler = event => {
        setEnteredEmail(event.target.value)   
    }

    
    const passwordChangeHandler = event => {
        setEnteredPassword(event.target.value)

        // setFormIsValid(
        //     event.target.value.trim().length > 6 && enteredEmail.includes('@')
        // );
    }

    const validateEmailHandler = () => {
        setEmailIsValid(enteredEmail.includes('@'))
    }

    const validatePasswordHandler = () => {
        setPasswordIsValid(enterpassword.trim().length>6)
    }

    const submitHandler = event => {
        event.preventDefault();
        props.onLogin(enteredEmail, enterpassword)
    };

    return (
        <Card className={classes.login}>
            <form onSubmit={submitHandler}>
                <div
                    className={`${classes.control} ${
                        emailIsvalid === false ? classes.invalid : ''
                        }`}
                >
                    <label htmlFor='email'>E-Mail</label>
                    <input type='email' id='email'
                        value={enteredEmail}
                        onChange={emailchangeHandler}
                        onBlur={validateEmailHandler}
                    />
                </div>
                <div className={`${classes.control} ${
                    passwordIsvalid === false ?  classes.invalid : ''
                }`}>
                    <label htmlFor='password'>Password</label>
                    <input type='password' id='password'
                        value={enterpassword}
                        onChange={passwordChangeHandler}
                        onBlur={validatePasswordHandler}
                    />
                </div>

                <div className={classes.actions}>
                    <Button type='submit'
                        className={classes.button}
                        disabled={!formIsvalid}
                    >
                        Login
                    </Button>
                </div>
            </form>
        </Card>
    )
}

export default Login;