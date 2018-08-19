import React, {Component} from 'react';
import './modal-confirm.css'
import Button from "./button";

class ModalConfirm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            outCancel: false
        }
        this.modal = React.createRef();
        this.closeBtn = React.createRef();
        this.closeModal = this.closeModal.bind(this)
        this.outsideClick = this.outsideClick.bind(this)
    }

    componentDidMount() {
            this.init();
    }

    init() {
        this.modal.current.style.display = 'block';
        //this.closeBtn.current.addEventListener('click', this.closeModal);
        window.addEventListener('click', this.outsideClick);

        function openModal() {
            this.modal.current.style.display = 'block';
        }
    }

    outsideClick(e) {
        if ( this.modal.current && e.target.id === this.modal.current.id && this.state.outCancel) {
            this.modal.current.style.display = 'none';
        }
    }

    closeModal() {
        this.modal.current.style.display = 'none';
    }

    render() {
        const {title, content, handleConfirm, handleCloseButton} = this.props
        return (
            <div>
                <div id='simpleModal' ref={this.modal} className={'modal'}>
                    <div className='modal-content'>
                        <div className='modal-header'>
                            <span ref={this.closeBtn} onClick={handleCloseButton} className='closeBtn'>&times;</span>
                            <h2>{title}</h2>
                        </div>
                        <div className='modal-body'>
                            <p>{content}</p>
                        </div>
                        <div className={'horizontal-buttons-modal'}>
                            <Button name={'Confirm'} classNameButton={'button-blue'} handleClick={handleConfirm}/>
                            <Button name={'Cancel'} classNameButton={'button-blue'} handleClick={handleCloseButton}/>
                        </div>
                        <div className='modal-footer'>
                            <h3>Modal Footer</h3>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

}

export default ModalConfirm