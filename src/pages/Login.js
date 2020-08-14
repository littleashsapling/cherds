import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { signin, signInGoogle } from '../helpers/auth';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            email: '',
            password: ''
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
            await signin(this.state.email, this.state.password);
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
                    <form
                        autoComplete='off'
                        onSubmit={this.handleSubmit}
                    >
                        <h2>
                            Login to<Link to='/'> Cherds</Link>
                        </h2>
                        <p>
                            Fill in the form below to login to your account.
          </p>
                        <div>
                            <input
                                placeholder='Email'
                                name='email'
                                type='email'
                                onChange={this.handleChange}
                                value={this.state.email}
                            />
                        </div>
                        <div>
                            <input
                                placeholder='Password'
                                name='password'
                                onChange={this.handleChange}
                                value={this.state.password}
                                type='password'
                            />
                        </div>
                        <div>
                            {this.state.error ? (
                                <p>{this.state.error}</p>
                            ) : null}
                            <button type='submit' className='btn btn-warning'>Login</button>
                        </div>
                        <button className='btn btn-warning' type='button' onClick={this.googleSignIn}>
                            Sign in with Google
                    </button>
                        <hr />
                        <p>
                            Don't have an account? <Link to='/signup'>Sign up</Link>
                        </p>
                    </form>
                </div>
                <Footer></Footer>
            </div>
        );
    }
}

