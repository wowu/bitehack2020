import React, { Component } from "react";

export default class IconToggle extends Component {
  constructor(props) {
    super(props);
    this.iconOn = this.props.iconOn;
    this.iconOff = this.props.iconOff;
    this.someProps = { ...props };
    // can not modify original props
    delete this.someProps.iconOn;
    delete this.someProps.iconOff;
  }
  render() {
    return (
      <i
        {...this.someProps}
        className={`toggle-icon ${
          this.props.value ? this.iconOn : this.iconOff
        }`}
      />
    );
  }
}
