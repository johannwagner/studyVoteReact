import * as React from "react";
import {Component} from "react";
import './HorizontalStackPanel.css';
import * as _ from 'lodash';

class HorizontalStackPanel extends Component {
    constructor() {
        super();


    }

    updateDimensions() {

        const windowHeight = window.innerHeight;
        const windowWidth = window.innerWidth;
        const stackWidth = 500;
        const maxVisibleItems = _.floor(windowWidth / stackWidth);

        this.setState(
            {
                windowHeight: windowHeight,
                windowWidth: windowWidth,
                maxVisibleItems: maxVisibleItems
            }
        );
    }


    componentWillMount() {
        this.updateDimensions();
    }


    componentDidMount() {
        window.addEventListener("resize", this.updateDimensions.bind(this));
    }


    componentWillUnmount() {
        window.removeEventListener("resize", this.updateDimensions.bind(this));
    }

    render() {

        let childrenArray = !_.isArray(this.props.children) ? [this.props.children] : this.props.children;

        let showChildren = childrenArray.filter((child) =>{
            return child.props.showCondition;
        });
        let children = showChildren.slice(Math.max(-this.state.maxVisibleItems, -showChildren.length)).map((child) => {

            return (
                <div key={child.stackTitle} className="StackChild">
                    <div className="StackTitle">
                        <div className="StackBack" onClick={child.props.backAction}>
                            {(child.props.hasBack ? <i className="fa fa-arrow-left"/> : null)}
                        </div>
                        <div className="StackHeader">
                            {child.props.stackTitle}
                        </div>
                        <div onClick={child.props.forwardAction} className="StackAdditionalButton">
                            <i className={"fa " + child.props.forwardIcon}/>
                        </div>
                    </div>
                    <div className="StackContent">
                        {child}
                    </div>
                </div>
            )
        });

        return (
            <div className="HorizontalStackPanel">
                {children}
            </div>
        )
    }
}

export default HorizontalStackPanel;