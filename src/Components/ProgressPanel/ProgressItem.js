import {Component} from "react/cjs/react.production.min";
import * as React from "react";
import './ProgressItem.css'
import ProgressBar from "react-bootstrap/es/ProgressBar";
import * as _ from 'lodash';


class ProgressItem extends Component {
    render() {

        let pItem = this.props.progressItem;
        let progressPart = _.ceil(pItem.progress.percentageDone * 100 );

        return <div className="ProgressItem" onClick={this.props.onClick}>
            <div className="ProgressName">
                {String(pItem.courseInstance.displayName).length < 15 ?
                    pItem.courseInstance.displayName :
                    pItem.courseInstance.shortName }
            </div>
            <div className="ProgressBar">
                <ProgressBar bsStyle="success" now={progressPart} label={progressPart + "%"}/>
            </div>
            <div className="ProgressInformation">

            </div>
        </div>
    }
}

export default ProgressItem;