// @flow
import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import JsonSchemaForm from '../../components/common/JsonSchemaForm';
import { componentSchema } from '../../utils/jsonschema';

type Props = {
    cmpConfigModalShow: boolean,
    cmpConfig: Object,
    handleClose: Function,
    updateWorkflowCmpConfig: Function
}

export default class EditCmpConfigModal extends React.Component<Props, any> {
    constructor(props: any) {
        super(props);
        this.state = {
            formData: {},
        };
    }

    handleFormChange = ({ formData }) => {
        this.setState(prevState => ({
            formData: { ...prevState.formData, ...formData },
        }));
    }

    confirm = () => {
        const { formData } = this.state;
        const { cmpConfig, updateWorkflowCmpConfig } = this.props;
        updateWorkflowCmpConfig({ ...cmpConfig, ...formData });
    }

    handleClose = () => {
        const { handleClose } = this.props;
        handleClose();
    }

    render() {
        const { cmpConfigModalShow, handleClose } = this.props;
        const { formData } = this.state;
        return (
            <Modal show={cmpConfigModalShow} onHide={this.handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>编辑节点配置</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="smart-form client-form">
                        <JsonSchemaForm
                            liveValidate
                            showErrorList={false}
                            formData={formData}
                            schema={componentSchema.schema}
                            uiSchema={componentSchema.uiSchema}
                            onChange={this.handleFormChange}
                        >
                            <div />
                        </JsonSchemaForm>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={this.confirm}>确定</Button>
                    <Button onClick={handleClose}>取消</Button>
                </Modal.Footer>
            </Modal>
        );
    }
}
