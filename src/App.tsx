import { useEffect, useState } from "react";
import  ReactDOM  from "react-dom";
import { Button, Input, Table, Modal, } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import "antd/dist/antd.css";
import "./App.css";

function App (){
  const randId = Math.floor(Math.random() * 10000);
  const [estaEditando, setEstaEditando] = useState(false);
  const [editar, setEditar] = useState({
    id: randId,
    nome: "",
    email: "",
    telefone: ""
  });
  const [pessoa, setPessoa] = useState({
    id: randId,
    nome: "",
    email: "",
    telefone: ""
  });

  
  const [dataSource, setDataSource] = useState([
    {
      id: 1,
      nome: "João",
      email: "joao@joao.com",
      telefone: "11-1111-1111"
    },
    {
      id: 2,
      nome: "Maria",
      email: "maria@maria.com",
      telefone: "11-2222-2222"
    },
    {
      id: 3,
      nome: "Pedro",
      email: "pedro@gmail.com",
      telefone: "11-3333-3333"
    },
    {
      id: 4,
      nome: "Ana",
      email: "ana@lisa.com.br",
      telefone: "11-4444-4444"
    }
  ]);
  
  
  const columns = [
    {
      key:'1',
      title: 'ID',
      dataIndex: 'id',
    },
    {
      key:'2',
      title: 'Nome',
      dataIndex: 'nome',
    },
    {
      key:'3',
      title: 'Email',
      dataIndex: 'email',
    },
    {
      key:'4',
      title: 'Telefone',
      dataIndex: 'telefone',
    },
    {
      key:'5',
      title: 'Ações',
      render: (record:any) => {
        return (
          <div>
            <EditOutlined onClick={()=>{
              editarPessoa(record);
            }} style={{color: "#36F", fontSize: "1.2rem", marginRight: "10px"}} />
            <DeleteOutlined onClick={()=>{
              deletarPessoa(record)
            }} style={{color: "#F36", fontSize: "1.2rem"}} />
          </div>
        );
      }
    }
  ];

  
  const deletarPessoa = (record:any) => {
    Modal.confirm({
      title: 'Você tem certeza que deseja deletar?',
      content: 'Ao deletar a pessoa, todos os dados serão perdidos.',
      okText: 'Sim',
      okType: 'danger',
      cancelText: 'Não',
      onOk: () => {
        setDataSource(pessoa => {
          return pessoa.filter(pessoa => pessoa.id !== record.id)
        })
      }
    });
  }

  
  const editarPessoa = (record:any) => {
    setEstaEditando(true);
    setEditar({...record});
  }
  const cancelarEdicao = () => {
    setEstaEditando(false);
    setEditar({ id: randId, nome: "", email: "", telefone: "" });
  }

  return(
    <div className="App">
      <header className="App-header">
        <h1>Teste de CRUD com React</h1>
        <div>
          <input type="text" id="nome" style={{color: "#000"}} placeholder="Nome" onChange={(dados)=>{
            setPessoa({...pessoa, nome: dados.target.value})
          }} /><br/>
          <input type="text" id="email" style={{color: "#000"}}  placeholder="Email" onChange={(dados)=>{
            setPessoa({...pessoa, email: dados.target.value})
          }} /><br/>
          <input type="text" id="telefone" style={{color: "#000"}}  placeholder="Telefone" onChange={(dados)=>{
            setPessoa({...pessoa, telefone: dados.target.value})
          }} /><br/>
          <Button onClick={
            ()=>{
              const campos = [
                document.querySelector("#nome"),
                document.querySelector("#email"),
                document.querySelector("#telefone")
              ];
              pessoa.nome !== "" && pessoa.email !== "" && pessoa.telefone !== "" ?
                (
                  setPessoa({...pessoa, id: randId}),
                  setDataSource(() => {return [...dataSource, pessoa]}),
                  setPessoa({ id: randId, nome: "", email: "", telefone: "" }),
                  campos.forEach(input => {
                    input!.value="";
                  })
                )
                :
                Modal.error({
                  title: 'Erro',
                  content: 'Preencha todos os campos para adicionar uma nova pessoa.'
                })
            }}>Adicionar pessoa</Button>
        </div>
        <br/>
        <Table columns={columns} dataSource={dataSource} />
        <Modal
          title="Editar pessoa"
          visible={estaEditando}
          okText="Salvar"
          cancelText="Cancelar"
          onCancel={()=>{cancelarEdicao()}}
          onOk={()=>{
            setDataSource((pessoaEditada) => {
              return pessoaEditada.map(pessoa => {
                if(pessoa.id === editar!.id){
                  return editar
                }else{
                  return pessoa
                }
              })
            })
            cancelarEdicao();
          }}
        >
          <Input type="text" value={editar.nome} onChange={(dados)=>{
            setEditar((pessoaEditada) => {
            return {...pessoaEditada, nome: dados.target.value};
            })}} /><br/>
          <Input type="text" value={editar.email} onChange={(dados)=>{
            setEditar((pessoaEditada) => {
              return {...pessoaEditada, email: dados.target.value};
            })}} /><br/>
          <Input type="text" value={editar.telefone} onChange={(dados)=>{
            setEditar((pessoaEditada) => {
              return {...pessoaEditada, telefone: dados.target.value};
            })}} /><br/>
        </Modal>

      </header>
    </div>
  );
}

export default App;