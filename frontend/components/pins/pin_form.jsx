import React from 'react';
import GreetingContainer from '../header/greeting_container';

class Pin extends React.Component {
    constructor(props) {
        super(props);
        this.state = props.pin;
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleFile = this.handleFile.bind(this);
    }

    handleSubmit(e) {
        e.preventDefault();
        const fd = new FormData();
        fd.append('pin[author_id]', this.state.author_id);
        fd.append('pin[title]', this.state.title);
        fd.append('pin[link_url]', this.state.link_url);
        fd.append('pin[photo]', this.state.photoFile);
        fd.append('pin[board_id]', this.state.board_id)
        this.props.action(fd);
        let path = `/`;
        this.props.history.push(path);
    }

    handleFile(e) {
        e.preventDefault();
        const file = e.currentTarget.files[0];
        const fileReader = new FileReader();
        fileReader.onloadend = () => {
            this.setState({ photoFile: file, photoUrl: fileReader.result });
        };
        if (file) {
            fileReader.readAsDataURL(file);
        }
    }
    updateTitle(e) {
        this.setState({title: e.target.value});
    }

    updateLink(e) {
        this.setState({link_url: e.target.value})
    }

    render() {
        return (
            <div>
            <GreetingContainer />
            <div className="pinFormContainer">
            <div className="containerContainer">

                <div className="formContainer">
                    <div className="headingsContainer">
                        <div id="headings">
                            <h1>{this.props.formType}</h1>
                            <h2>Pins are kinda like the point of this site, make one here !</h2>
                        </div>
                    </div>

                    <form id="createPinForm">
                        <label>Title<br></br>
                            <input
                                value={this.state.title}
                                type="text"
                                onChange={this.updateTitle.bind(this)}
                                placeholder="Cool stuff"
                            /></label>
                        <label>Link URL<br></br>
                            <input
                                value={this.state.link_url}
                                type="text"
                                onChange={this.updateLink.bind(this)}
                                placeholder="www.google.com"
                            /></label>

                                <input type="file" onChange={this.handleFile}></input>
                            
                            <div className="buttonsContainer">
                                <button onClick={this.handleSubmit}>{this.props.formType}!</button>
                            </div>
                        
                    </form>
                </div>
            </div>
                </div></div>
        )
    }
}

export default Pin;