import React, { useState, useEffect } from 'react';
import { Layout, Table, Button, PageHeader, message, Modal, Input, Space, Popconfirm } from 'antd';
import axios from 'axios';
import "../style/produccion.css"

const { Content } = Layout;

let API = "https://api.escuelajs.co/api/v1/products/"


const Produccion = () => {
    // const[individual,setIndividual] = React.useState({key:[], name: "", code:[], address: ""})

    const [visible, setVisible] = React.useState(false);
    const [updateId, setUpdateId] = useState()
    const [confirmLoading, setConfirmLoading] = React.useState(false);
    const [modalText, setModalText] = React.useState('Ingrese los datos Solicitados');

    const [productos, setProductos] = useState([]);
    
    const getData = async () =>{
        let response = await axios(API)
        setProductos(response.data)
    }

    useEffect(() => {
        getData()

    },[])

    function confirmModal() {
        message.success('Producto en lista');
    }

    async function confirm(id) {
        try {
            await axios.delete(`${API}${id}`)
            getData()
            message.success('Producto eliminado');
        } catch (error) {
            message.success('A ocurrido un erros')
        }
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
                    <a href="#/" onClick={() => showModal(true, Product.key)}>Editar</a>
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
            [event.target.name]: event.target.name === "images" ?[event.target.value]: event.target.value
            // images: event.target.name === "images"?[event.target.value] : "" 
        })
    }

    const showModal = async (editar = null, id = null) => {
        if (editar) {
            const value = await axios.get(`${API}${id}`)
            setDatos({ title: value.data.title, price: value.data.price, description: value.data.description, categoryId: 1, images: value.data.images })
            setUpdateId(id)
        } else {
            setDatos({
                title: '',
                price: '',
                description: '',
                categoryId: 1,
                images: []
            })
        }
        setVisible(true);
        getData()
    };

    const handleOk = async id => {
        if (id) {
            await axios.put(`${API}${id}`, datos)
            try {
                message.success('Editado con exito');
                getData()
            } catch (error) {
                message.success('A ocurrido un erros')
            }
        } else {
            try {
                    await axios.post(API, datos)
                        try {
                            setConfirmLoading(false);
                            confirmModal()
                            getData()
                            setModalText('Enviando los datos');
                        } catch (error) {
                            message.success('A ocurrido un erros')
                    }
            } catch (error) {
                message.error('Ha ocurrido un error');
            }
        }
        setVisible(false);
    };


    const handleCancel = () => {
        setVisible(false);
    };

    const data = productos?.map(product => {
        return ({
            key: product.id,
            title: product.title,
            price: `Q ${product.price}`,
            description: product.description,
            images: product.images,
        }
        )
    }
    )
    return (
        <Layout>
            <Layout className="site-layout">
                <PageHeader

                    title="Lista de Productos"
                    extra={[
                        <Button key="1" type="primary" onClick={() => showModal()}>
                            Añadir nuevo producto
                        </Button>,
                    ]}
                />

                <Modal
                    title="Crear Nuevo Producto"
                    visible={visible}
                    onOk={() => handleOk(updateId)}
                    confirmLoading={confirmLoading}
                    onCancel={handleCancel}

                >
                    <p>{modalText}</p>
                    <br />
                    <label>Nombre del Producto</label>
                    <Input
                        required
                        name="title"
                        onChange={handleInputChange}
                        value={datos.title}
                        placeholder="Ingrese un nombre" />
                    <br />
                    <br />
                    <label>Precio del Producto</label>
                    <Input
                        required
                        type="number"
                        name="price"
                        onChange={handleInputChange}
                        value={datos.price}
                        placeholder="Ingrese el Precio" />
                    <br />
                    <br />
                    <label>Descripcion del Producto</label>
                    <Input
                        required
                        name="description"
                        onChange={handleInputChange}
                        value={datos.description}
                        placeholder="Ingrese una Descripcion" />
                    <br />
                    <br />
                    <label>Imagen del Producto</label>
                    <Input
                        required
                        name="images"
                        onChange={handleInputChange}
                        value={datos.images}
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