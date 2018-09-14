/**
 * Created by griga on 12/1/15.
 */

import React from 'react';
import classnames from 'classnames';

import Body from './JarvisWidget-Body';

export default class JarvisWidget extends React.Component {
  static counter = 0;

  static defaultProps = {
      colorbutton: true,
      editbutton: true,
      togglebutton: true,
      deletebutton: true,
      fullscreenbutton: true,
      custombutton: false,
      collapsed: false,
      sortable: true,
      hidden: false,
      color: false,
      load: false,
      refresh: false,
  };

  componentDidMount() {
      $(this.refs[this.widgetId]).find('.widget-body').prepend('');
  }

  genId() {
      const { name } = this.props;
      if (name) return name;

      let id = `jarviswidget-${this.counter++}`;
      id = id.toLowerCase().replace(/\W+/gm, '-');

      const url = location.pathname.substr(1).replace(/\//g, '-');
      id = `${url}--${id}`;

      return id;
  }

  render() {
      const { color, sortable } = this.props;
      const colorClass = color ? `jarviswidget-color-${color}` : '';
      const classes = classnames('jarviswidget', colorClass, {
          'jarviswidget-sortable': sortable === true,
      });

      const widgetProps = {};

      this.widgetId = this.genId();

      ['colorbutton', 'editbutton', 'togglebutton', 'deletebutton',
          'fullscreenbutton', 'custombutton', 'sortable'].forEach((option) => {
          if (!this.props[option]) { widgetProps[`data-widget-${option}`] = false; }
      });

      ['hidden', 'collapsed'].forEach((option) => {
          if (this.props[option]) { widgetProps[`data-widget-${option}`] = true; }
      });

      ['refresh', 'load'].forEach((option) => {
          if (this.props[option]) { widgetProps[`data-widget-${option}`] = this.props[option]; }
      });

      return (
          <div
              className={classes}
              id={this.widgetId}
              ref="widget"
              {...widgetProps}
          >
              {this.props.children}

          </div>
      );
  }
}

JarvisWidget.Body = Body;
