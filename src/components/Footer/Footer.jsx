import React, {Component} from 'react';
import './Footer.css';
class Footer extends Component {
    constructor(props){
        super(props)

        this.state = {
        }
    }
    render() {
        return (
            <footer className="footer">
                <span className="text-span">All Rights Reserved 2023 @zhetkerbayevan </span>
            </footer>
        );
    }
}

export default Footer;