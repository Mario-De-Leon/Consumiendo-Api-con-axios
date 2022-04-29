import React, { useState } from 'react';
import { Layout, Table, Button, PageHeader, message, Modal, Input, Space, Popconfirm } from 'antd';
import useInitialState from '../hooks/useInitialState';
import axios from 'axios';
import "../style/produccion.css"

const { Content } = Layout;

let API = "https://api.escuelajs.co/api/v1/products/"


const Produccion = () => {
    // const[individual,setIndividual] = React.useState({key:[], name: "", code:[], address: ""})

    const productosPlatzi = useInitialState(API)


    const [visible, setVisible] = React.useState(false);
    const [confirmLoading, setConfirmLoading] = React.useState(false);
    const [modalText, setModalText] = React.useState('Ingrese los datos Solicitados');


    function confirmModal() {
        message.success('Producto en lista');
    }

    function confirm(id) {
        message.success('Producto eliminado');
    
        axios.delete(`${API}${id}`)
        .then(function (response) {
            console.log(response);
        })
        .catch(function (error) {
            console.log(error);
        })
    
    }

    function cancel() {
        message.error('Cancelado');
    }

    


    const columns = [
        {
            title: 'Imagen',
            dataIndex: 'images',
            key: 'images',
            render: (text) => <img className="image-product" src={text} alt="" />
        },

        {
            title: 'Producto',
            dataIndex: 'title',
            key: 'title',
        },
        {
            title: 'Precio',
            dataIndex: 'price',
            key: 'price',
        },
        {
            title: 'Descripcion',
            dataIndex: 'description',
            key: 'description',
        },
        {
            title: 'Acciones',
            key: 'action',
            render: (Product) => (
                <Space size="middle">
                    <a href="#/" onClick={showModal}>Editar</a>
                    <Popconfirm
                        title="¿Estás seguro de que quieres eliminar al proveedor?"
                        onConfirm={() => confirm(Product.key)}
                        onCancel={cancel}
                        okText="Si"
                        cancelText="No"
                    >
                        <a href="#/">Eliminar</a>
                    </Popconfirm>
                </Space>
            ),
        },
    ];




    const data = productosPlatzi.map(product => {
        return ({
            key: product.id,
            title: product.title,
            price: product.price,
            description: product.description,
            images: product.images,
        }
        )
    }
    )

    const [datos, setDatos] = useState({
        title: '',
        price: '',
        description: '',
        categoryId: 1,
        images: []
    })

    const handleInputChange = (event) => {
        setDatos({
            ...datos,
            [event.target.name]: event.target.value
        })
        
    }

    const showModal = () => {
        setVisible(true);
    };

    const handleOk = () => {
        setModalText('Enviando los datos');
        setConfirmLoading(true);
        setTimeout(() => {
            setVisible(false);
            setConfirmLoading(false);
            confirmModal()



            axios.post(API, datos)
                .then(function (response) {
                    console.log(response);
                })
                .catch(function (error) {
                    console.log(error);
                });

        }, 2000);
    };

    const handleCancel = () => {
        setVisible(false);
    };

    return (
        <Layout>
            <Layout className="site-layout">
                <PageHeader

                    title="Lista de Productos"
                    extra={[
                        <Button key="1" type="primary" onClick={showModal}>
                            Añadir nuevo producto
                        </Button>,
                    ]}
                />

                <Modal
                    title="Crear Nuevo Producto"
                    visible={visible}
                    onOk={handleOk}
                    confirmLoading={confirmLoading}
                    onCancel={handleCancel}
                >
                    <p>{modalText}</p>
                    <br />
                    <label>Nombre del Producto</label>
                    <Input
                        name="title"
                        onChange={handleInputChange}
                        placeholder="Ingrese un nombre" />
                    <br />
                    <br />
                    <label>Precio del Producto</label>
                    <Input
                        type="number"
                        name="price"
                        onChange={handleInputChange}
                        placeholder="Ingrese el Precio" />
                    <br />
                    <br />
                    <label>Descripcion del Producto</label>
                    <Input
                        name="description"
                        onChange={handleInputChange}
                        placeholder="Ingrese una Descripcion" />
                    <br />
                    <br />
                    <label>Imagen del Producto</label>
                    <Input
                        name="images"
                        onChange={handleInputChange}
                        placeholder="Ingrese URL de la imagen" />
                    <br />
                    <br />
                </Modal>

                <Content
                    className="site-layout-background"
                    style={{
                        margin: '24px 16px',
                        padding: 24,
                        minHeight: 280,
                    }}
                >
                    <Table columns={columns} dataSource={data} />
                </Content>
            </Layout>
        </Layout>
    );
}
export default Produccion;