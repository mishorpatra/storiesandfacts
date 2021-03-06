import { TextField, makeStyles, Box, Typography, Button, CircularProgress } from '@material-ui/core'
import { useState } from 'react'
import { newUser, getUser, resetPassword } from '../../services/api'

//components
import Eye from './Eye'

const useStyle = makeStyles(theme => ({
    component: {
        width: '100%',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '40%',
        border: '1px solid #dedede',
        borderRadius: 5,
        [theme.breakpoints.down('sm')]: {
            width: '100%'
        }
    },
    image: {
        maxWidth: 100,
        margin: '30px 0'
    },
    inputBx: {
        width: '100%',
        borderTop: '1px solid #dedede',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '30px 0',
        marginTop: 15
    },
    input: {
        width: 340,
        marginTop: 10
    },
    signin: {
        color: 'blue',
        textTransform: 'uppercase',
        fontWeight: 600
    },
    btn: {
        width: 340,
        height: 40,
        marginTop: 25
    },
    smallText: {
        fontSize: 13,
        marginBottom: 15,
        cursor: 'pointer',
        color: 'blue'
    },
    pass: {
        display: 'flex', 
        alignItems: 'center',
        position: 'relative',
        left: 10
        
    },
    eye: {
        position: 'relative',
        top: 8,
        right: 25
    }
}))

const loginInitials = {
    name: "",
    email: "",
    password: "",
    cnfPassword: ""
}
const signinInitials = {
    email: "",
    password: ""
}
const retrieveInitials = {
    recoverEmail: ""
}

var initialView = {
    login: {
        view: 'login'
    },
    signup: {
        view: 'signup'
    },
    forget: {
        view: 'forget'
    }
}
const Login = ({setUserInfo}) => {
    const classes = useStyle()
    const url = 'https://i.imgur.com/X93ailI.png'
    const [account, setAccount] = useState(initialView.login)
    const [userSignUp, setUserSignUp] = useState(loginInitials)
    const [userSignIn, setUserSignIn] = useState(signinInitials)
    const [isLoading, setIsLoading] = useState(false)
    const [userRetrieve, setUserRetrieve] = useState(retrieveInitials)

    const toggleAccountOfLogin = () => {
        setAccount(initialView.signup)
    }
    const toggleAccountOfSignup = () => {
        setAccount(initialView.login)
    }

    const handleSignup = (e) => {
        setUserSignUp({...userSignUp, [e.target.name]: e.target.value})
    }
    const handleSignin = (e) => {
        setUserSignIn({...userSignIn, [e.target.name]: e.target.value})
    }
    const siginInHandle = async () => {
        setIsLoading(true)
        const { email, password } = userSignIn
        if( !email || !password ) alert('Please fill all the fields')
        else {
            let response = await getUser(userSignIn)
            if(typeof response.data === 'string') alert(response.data)
            else setUserInfo(response.data)
        }
        setIsLoading(false)
    }
    const signUpHandle = async () => {
        setIsLoading(true)
        const { name, email, password, cnfPassword } = userSignUp
        if( !name || !email || !password || !cnfPassword ) alert('Please fill all the fields') 
        else if(password !== cnfPassword) alert("Password did not match")
        else {
            let response = await newUser({name, email, password})
            if(response) alert(response.data)
            toggleAccountOfSignup()
        }
        setIsLoading(false)
        
    }
    const forgetPassword = () => {
        setAccount(initialView.forget)
    }
    const handleRetrive = (e) => {
        setUserRetrieve({...userRetrieve, [e.target.name]: e.target.value})
        console.log(userRetrieve)
    }
    const sendPassword = async () => {
        setIsLoading(true)
        let response = await resetPassword(userRetrieve)
        setIsLoading(false)
        alert(response.data)
        if(response.data === 'Please enter the currect email') return
        else toggleAccountOfSignup()
    }


    return account.view === 'login' 
    ? (
        <Box className={classes.component}>
            <Box className={classes.container}>
                <img src={url} alt="logo" className={classes.image} />
                {
                    isLoading && <CircularProgress />
                }
                <form className={classes.inputBx}>
                    <Typography className={classes.signin}>Sign In</Typography>
                    <TextField label="Email" name="email" required={true} variant='outlined' className={classes.input} onChange={(e) => handleSignin(e)} />
                    <Box className={classes.pass}>
                        <TextField label="Password" name="password" required={true} variant='outlined' type="password"  className={classes.input} id="pass" onChange={(e) => handleSignin(e)} />
                        <Box className={classes.eye}>
                            <Eye elm='pass' />
                        </Box>
                    </Box>
                    <Button variant="contained" className={classes.btn} color='primary' onClick={() => siginInHandle()}>Sign In</Button>
                </form>
                <Typography className={classes.smallText} onClick={() => forgetPassword()} >Forgot Password?</Typography>
                <Typography className={classes.smallText} onClick={() => toggleAccountOfLogin()}>New to Facts and Stories ? Sign Up.</Typography>
            </Box>
        </Box>
    )
    : account.view === 'signup' 
    ?   (
        <Box className={classes.component}>
            <Box className={classes.container}>
                <img src={url} alt="logo" className={classes.image} />
                {
                    isLoading && <CircularProgress />
                }
                <form className={classes.inputBx}>
                    <Typography className={classes.signin}>Sign Up</Typography>
                    <TextField label="Name" name="name" required={true} variant='outlined' className={classes.input} onChange={(e) => handleSignup(e)} />
                    <TextField label="Email" name="email" required={true} variant='outlined' type="email"  className={classes.input} onChange={(e) => handleSignup(e)} />
                    <Box className={classes.pass}>
                        <TextField label="Password" name="password" required={true} variant='outlined' type="password"  className={classes.input} id="newpass" onChange={(e) => handleSignup(e)} />
                        <Box className={classes.eye}>
                            <Eye elm='newpass' />
                        </Box>
                    </Box>
                    <Box className={classes.pass}>
                        <TextField label="Confirm Password" name="cnfPassword" required={true} variant='outlined' type="password"  className={classes.input} id="cnfpass" onChange={(e) => handleSignup(e)} />
                        <Box className={classes.eye} >
                            <Eye elm='cnfpass' />
                        </Box>
                    </Box>
                    <Button variant="contained" className={classes.btn} color='primary' onClick={() => signUpHandle()}>Sign Up</Button>
                </form>
                <Typography className={classes.smallText} onClick={() => toggleAccountOfSignup()}>Already an User ? Sign In.</Typography>
            </Box>
        </Box>
    )
    : (
        <Box className={classes.component}>
            <Box className={classes.container}>
                <img src={url} alt="logo" className={classes.image} />
                {
                    isLoading && <CircularProgress />
                }
                <form className={classes.inputBx}>
                    <Typography className={classes.signin}>Retrieve Password</Typography>
                    <TextField label="Email" name="recoverEmail" required={true} variant='outlined' className={classes.input} onChange={(e) => handleRetrive(e)} />
                    
                    <Button variant="contained" className={classes.btn} color='primary' onClick={() => sendPassword()}>Reset Password</Button>
                </form>
                <Typography className={classes.smallText} onClick={() => toggleAccountOfSignup()} >Back to Sign in</Typography>
            </Box>
        </Box>
    )
}

export default Login