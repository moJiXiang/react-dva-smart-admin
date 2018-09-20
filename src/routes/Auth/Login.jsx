// @flow
import React from 'react';
import { connect } from 'dva';
import { Button } from 'react-bootstrap';
import { NotificationContainer } from 'react-notifications';

import JsonSchemaForm from '../../components/common/JsonSchemaForm';
import { loginJsonSchema } from '../../utils/jsonschema';
import logo from '../../assets/img/logo.png';
import type { loginType } from '../../utils/flowtype';
import './Login.scss?global';

type StateType = {
    formData: loginType
}

class Login extends React.PureComponent<any, StateType> {
    state = {
        formData: {
            username: '',
            password: '',
        },
    }

    componentDidMount() {

    }

    handleFormChange = ({ formData }) => {
        this.setState(prevState => ({
            formData: { ...prevState.formData, ...formData },
        }));
    }

    handleFormSubmit = () => {
        const { formData } = this.state;
        const { dispatch } = this.props;
        dispatch({
            type: 'auth/login',
            payload: formData,
        });
    }

    render() {
        const { submiting } = this.props;
        const { formData } = this.state;
        const log = type => console.log.bind(console, type);

        return (
            <div id="extr-page">
                <NotificationContainer />
                <header id="header" className="animated fadeInDown">

                    <div id="logo-group">
                        <span id="logo">
                            {' '}
                            <img src={logo} alt="Opsmind" />
                            {' '}
                        </span>
                    </div>

                    <span id="extr-page-header-space">
                        {' '}
                        <span className="hidden-mobile hiddex-xs">无帐号？</span>
                        &nbsp;
                        <a
                            href="#/register"
                            className="btn btn-danger"
                        >
                        注册帐号
                        </a>
                        {' '}
                    </span>

                </header>

                <div id="content" className="container animated fadeInDown">
                    <div className="row">
                        <div className="col-lg-4 col-lg-offset-4">
                            <div className="well no-padding" style={{ marginTop: '100px' }}>
                                <div id="login-form" className="smart-form client-form">
                                    <header>
                                        登录
                                    </header>
                                    <JsonSchemaForm
                                        liveValidate
                                        showErrorList={false}
                                        formData={formData}
                                        schema={loginJsonSchema.schema}
                                        uiSchema={loginJsonSchema.uiSchema}
                                        onChange={this.handleFormChange}
                                        onError={log('errors')}
                                    >
                                        <div />
                                    </JsonSchemaForm>
                                    <div style={{ backgroundColor: '#fff', padding: '5px 14px 5px' }}>
                                        <section>
                                            <div className="note" style={{ marginBottom: '5px' }}>
                                                <a href="#/forgot">忘记密码？</a>
                                            </div>
                                            <label className="checkbox">
                                                <input type="checkbox" name="remember" defaultChecked />
                                                <i />
                                                    保持登录
                                            </label>
                                        </section>
                                    </div>
                                    <footer>
                                        <Button
                                            bsStyle="primary"
                                            disabled={submiting}
                                            onClick={!submiting ? this.handleFormSubmit : null}
                                        >
                                            {submiting ? '登录中...' : '登录'}
                                        </Button>
                                    </footer>
                                </div>
                                {/* <UiValidate>
                                        <form action="#/dashboard" id="login-form" className="smart-form client-form">
                                            <header>
                                                Sign In
                                            </header>
                                            <fieldset>
                                                <section>
                                                    <label className="label">E-mail</label>
                                                    <label className="input">
                                                        {' '}
                                                        <i className="icon-append fa fa-user" />
                                                        <input
                                                            type="email"
                                                            name="email"
                                                            data-smart-validate-input=""
                                                            data-required=""
                                                            data-email=""
                                                            data-message-required="Please enter your email address"
                                                            data-message-email="Please enter a VALID email address"
                                                        />
                                                        <b className="tooltip tooltip-top-right">
                                                            <i className="fa fa-user txt-color-teal" />
                                                            Please enter email address/username
                                                        </b>

                                                    </label>
                                                </section>
                                                <section>
                                                    <label className="label">Password</label>
                                                    <label className="input">
                                                        {' '}
                                                        <i className="icon-append fa fa-lock" />
                                                        <input
                                                            type="password"
                                                            name="password"
                                                            data-smart-validate-input=""
                                                            data-required=""
                                                            data-minlength="3"
                                                            data-maxnlength="20"
                                                            data-message="Please enter your email password"
                                                        />
                                                        <b className="tooltip tooltip-top-right">
                                                            <i className="fa fa-lock txt-color-teal" />
                                                            {' '}
                                                            Enter your password
                                                        </b>
                                                        {' '}

                                                    </label>

                                                    <div className="note">
                                                        <a href="#/forgot">Forgot password?</a>
                                                    </div>
                                                </section>
                                                <section>
                                                    <label className="checkbox">
                                                        <input type="checkbox" name="remember" defaultChecked />
                                                        <i />
                                                        Stay signed in
                                                    </label>
                                                </section>
                                            </fieldset>
                                            <footer>
                                                <button type="submit" className="btn btn-primary">
                                                    Sign in
                                                </button>
                                            </footer>
                                        </form>
                                    </UiValidate> */}
                            </div>
                            <h5 className="text-center"> - Or sign in using -</h5>
                            <ul className="list-inline text-center">
                                <li>
                                    <a href="#" className="btn btn-primary btn-circle"><i className="fa fa-facebook" /></a>
                                </li>
                                <li>
                                    <a href="#" className="btn btn-info btn-circle"><i className="fa fa-twitter" /></a>
                                </li>
                                <li>
                                    <a href="#" className="btn btn-warning btn-circle"><i className="fa fa-linkedin" /></a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = ({ auth, loading }) => ({
    auth,
    submiting: loading.effects['auth/login'],
});

export default connect(mapStateToProps)(Login);
