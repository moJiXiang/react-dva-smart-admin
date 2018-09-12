import React from 'react';

export default class RecentProjects extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            projects: [
                {
                    href: '/',
                    title: 'Online e-merchant management system - attaching integration with the iOS',
                },
                {
                    href: '/',
                    title: 'Notes on pipeline upgradee',
                },
                {
                    href: '/',
                    title: 'Assesment Report for merchant account',
                },
            ],
        };
    }

    clearProjects = () => {
        this.setState({
            projects: [],
        });
    }

    render() {
        const { projects } = this.state;
        return (
            <div className="project-context hidden-xs dropdown">

                <span className="label">
                    Projects
                </span>
                <span className="project-selector dropdown-toggle" data-toggle="dropdown">
                    Recent projects
                    { projects.length
                        ? <i className="fa fa-angle-down" />
                        : null }
                </span>

                { projects.length
                    ? (
                        <ul className="dropdown-menu">
                            {projects.map(project => (
                                <li key={project.id}>
                                    <a href={project.href}>{project.title}</a>
                                </li>))}

                            <li className="divider" />
                            <li>
                                <a onClick={this.clearProjects}>
                                    <i className="fa fa-power-off" />
                                    {' '}
Clear
                                </a>
                            </li>
                        </ul>
                    ) : null}

            </div>
        );
    }
}
