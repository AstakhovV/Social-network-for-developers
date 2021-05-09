import React from 'react';
import s from '../Profile.module.css'


class ProfileStatus extends React.Component {
    state = {
        editMode: false
    }
    activateEditMode = () => {
        this.setState({
            editMode: true
        })
        this.state.editMode = true
        // костыль вместо setState - this.forceUpdate()
    }
    // активация и деактивация выполнены с помощью разного синтаксиса
    // активация - анонимная стрелочная функция
    // деактивация через bind
    deactivateEditMode () {
        this.setState({
            editMode: false
        })
        this.state.editMode = false
    }

    render() {
        return (
            <div>
                {!this.state.editMode &&
                <div>
                    <span onDoubleClick={this.activateEditMode}>Status: {this.props.status}</span>
                </div>
                }
                {this.state.editMode &&
                <div>
                    <input autoFocus={true} onBlur={this.deactivateEditMode.bind(this)} value={this.props.status}></input>
                </div>
                }
            </div>
        )
    }
}

export default ProfileStatus;