// @flow
import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import JsonSchemaForm from '../../components/common/JsonSchemaForm';
import { componentSchema, componentConfigSchema } from '../../utils/jsonschema';

type Props = {
    editCmpInputsModalShow: boolean,
    handleClose: Function,
}

export default class EditCmpConfigModal extends React.Component<Props, any> {
    constructor(props: any) {
        super(props);
        this.state = {
            formData: {},
        };
    }

    confirm = () => {

    }

    handleClose = () => {
        const { handleClose } = this.props;
        handleClose();
    }

    render() {
        const { editCmpInputsModalShow, handleClose } = this.props;
        const { formData } = this.state;
        return (
            <Modal show={editCmpInputsModalShow} onHide={this.handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>编辑节点配置</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <JsonSchemaForm
                        liveValidate
                        showErrorList={false}
                        formData={formData}
                        schema={componentSchema.schema}
                        uiSchema={componentSchema.uiSchema}
                    >
                        <div />
                    </JsonSchemaForm>
                    <JsonSchemaForm
                        liveValidate
                        showErrorList={false}
                        formData={formData}
                        schema={componentConfigSchema.schema}
                        uiSchema={componentConfigSchema.uiSchema}
                    >
                        <div />
                    </JsonSchemaForm>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={this.confirm}>确定</Button>
                    <Button onClick={handleClose}>取消</Button>
                </Modal.Footer>
            </Modal>
        );
    }
}
