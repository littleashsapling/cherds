import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { signup, signInGoogle } from '../helpers/auth';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default class SignUp extends Component {

    constructor(props) {
        super(props);
        this.state = {
            error: null,
            email: '',
            password: '',
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.googleSignIn = this.googleSignIn.bind(this);
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    async handleSubmit(event) {
        event.preventDefault();
        this.setState({ error: '' });
        try {
            await signup(this.state.email, this.state.password);
        } catch (error) {
            this.setState({ error: error.message });
        }
    }

    async googleSignIn() {
        try {
            await signInGoogle();
        } catch (error) {
            this.setState({ error: error.message });
        }
    }

    render() {
        return (
            <div>
                <Header></Header>
                <div>
                    <form onSubmit={this.handleSubmit}>
                        <h2> Sign Up to<Link to='/'> Cherds</Link></h2>
                        <p>Fill in the form below to create an account.</p>
                        <div>
                            <input placeholder='Email' name='email' type='email' onChange={this.handleChange} value={this.state.email}></input>
                        </div>
                        <div>
                            <input placeholder='Password' name='password' onChange={this.handleChange} value={this.state.password} type='password'></input>
                        </div>
                        <div>
                            {this.state.error ? <p>{this.state.error}</p> : null}
                            <button type='submit' class='btn btn-warning'>Sign up</button>
                        </div>
                        <p>Or</p>
                        <button onClick={this.googleSignIn} type='button' class='btn btn-warning'>
                            Sign up with Google</button>
                        <hr></hr>
                        <p>Already have an account? <Link to='/login'>Login</Link></p>
                    </form>
                </div>
                <Footer></Footer>
            </div>
        )
    }
}