import React from 'react';
import s from '../Profile.module.css'


class ProfileStatus extends React.Component {
    state = {
        editMode: false,
        status: this.props.status
    }
    activateEditMode = () => {
        this.setState({ // костыль вместо setState - this.forceUpdate()
            editMode: true
        })
        this.state.editMode = true
    }

    deactivateEditMode = () => {
        this.setState({
            editMode: false
        })
        this.state.editMode = false
        this.props.updateStatus(this.state.status)
    }
    onStatusChange = (e) => {
        if(e.currentTarget.value.length <= 200){ //ограничитель ввода
        this.setState({
            status: e.currentTarget.value
        })}

    }

    render() {
        return (
            <div>
                {!this.state.editMode &&
                <div>
                    <span onDoubleClick={this.activateEditMode}>{this.props.status || "No status"}</span>
                </div>
                }
                {this.state.editMode &&
                <div>
                    <input onChange={this.onStatusChange} autoFocus={true} onBlur={this.deactivateEditMode} value={this.state.status}></input>
                </div>

                }
                <div>{this.state.status.length}/200</div>
            </div>
        )
    }
}

export default ProfileStatus;