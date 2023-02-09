CREATE SCHEMA IF NOT EXISTS bestevents DEFAULT CHARACTER SET utf8 ;
USE bestevents;

create table usuario(
	id int not null,
    nome varchar(150) not null,
    telefone int not null,
    email varchar(200) not null,
    senha varchar(40) not null,
	sexo char (1),
    estado char(2) not null,
    cep int not null,
    cpf int not null,
    numEndereco int not null,
    complemento varchar(150),
    rua varchar (60),
    tipoPessoa char(1),
		constraint usuario_PK primary key (id),
        constraint email_UQ unique (email),
		constraint cpf_UQ unique (cpf)
);

create table cartaoUsuario(
	numero int not null,
    usuario_id int not null,
    validade date not null,
    cvv int not null,
		CONSTRAINT cartaoUsuario_PK PRIMARY KEY (numero),
        CONSTRAINT cartaoUsuario_idUsuario_FK foreign key (usuario_id) REFERENCES usuario (id)
);

create table `local`(
    id int not null,
    usuario_id int not null,
    nome Varchar(45) not null,
    complemento varchar(45),
    estado char(1) not null,
    numEndereco int not null,
    rua varchar(45) not null,
    cidade varchar(45) not null,
    custo decimal(6,2) not null,
    capacidade int not null,
    acessibilidade boolean not null,
    CONSTRAINT local_PK PRIMARY KEY (id),
    -- CONSTRAINT Local_idUsuario_PK PRIMARY KEY (usuario_id),
    CONSTRAINT Local_idUsuario_FK FOREIGN KEY (usuario_id) REFERENCES usuario (id)
);

create table evento(
    id int not null,
    Usuario_id int,
    Pagamento_idPagamento int,
    Local_id int,
    qtdpessoas int,
    `data` date,
    tipoEvento VARCHAR(45),
    valor decimal(7,2),
    descricao varchar(1200),
    CONSTRAINT evento_PK PRIMARY KEY (id),
    CONSTRAINT Evento_idUsuario_FK FOREIGN KEY (Usuario_id) REFERENCES usuario (id),
    CONSTRAINT Evento_idLocal_FK FOREIGN KEY (Local_id) REFERENCES `local` (id)
);

create table tipoEvento(
	tipo varchar(45) not null,
    Evento_id int not null,
		CONSTRAINT tipoEvento_PK PRIMARY KEY (tipo),
        CONSTRAINT tipoEvento_idEvento_FK FOREIGN KEY (Evento_id) REFERENCES evento (id)
);

create table pagamento(
	id int not null,
    usuario_id int not null,
    situacao int default 0,
    contrato varchar(50),
		CONSTRAINT pagamento_PK PRIMARY KEY (id),
        CONSTRAINT pagamento_idUsuario FOREIGN KEY (usuario_id) REFERENCES usuario (id)
);

create table funcionario(
	usuario_id int not null,
    tipoFuncionario char(15) not null,
    curriculo varchar(45),
    contaBancaria varchar(45) not null,
    numAgencia int not null,
    numConta int not null,
		CONSTRAINT funcionario_PK PRIMARY KEY (usuario_id),
        CONSTRAINT Usuario_idfuncionario_PK FOREIGN KEY (usuario_id) REFERENCES usuario(id)
);

create table eventoSelecionado(
	evento_id int not null,
    usuario_id int not null,
    salario float not null,
		CONSTRAINT eventoSelecionado_PK PRIMARY KEY (evento_id, usuario_id),
        CONSTRAINT Evento_idEventoSelecionado_FK FOREIGN KEY (evento_id) REFERENCES evento (id),
        CONSTRAINT Usuario_idEventoSelecionado_FK FOREIGN KEY (usuario_id) REFERENCES usuario (id)
);

create table equipamento(
	id int not null,
    tipo varchar(50) not null,
    nome varchar(50) not null,
    descricao varchar(1000) not null,
    valor float not null,
		CONSTRAINT equipamento_PK PRIMARY KEY (id)
);

create table equipamentoAlocado(
	evento_id int not null,
    equipamento_id int not null,
    quantidae int default 1,
    dataDeAlocacao date not null,
		CONSTRAINT equipamentoAlocado_PK PRIMARY KEY (evento_id, equipamento_id),
        CONSTRAINT Evento_idEquipamentoAlocado_FK FOREIGN KEY (evento_id) REFERENCES evento (id),
        CONSTRAINT Equipamento_idEquipamentoAlocado_FK FOREIGN KEY (equipamento_id) REFERENCES equipamento (id)
);

create table empresaBuffet(
	id int not null,
    nome varchar(100) not null,
    cnpj int not null,
		CONSTRAINT empresaBuffet_PK PRIMARY KEY (id),
		CONSTRAINT cnpj_UQ UNIQUE (cnpj)
);

create table cardapio(
	empresa_id int not null,
    item varchar(50) not null,
    valorItem float not null,
    descricao varchar(500),
		CONSTRAINT cardapio_PK PRIMARY KEY (empresa_id, item),
        CONSTRAINT Empresa_idCardapio FOREIGN KEY (empresa_id) REFERENCES empresaBuffet (id)
);

create table buffet(
	evento_id int not null,
    cardapio_empresa_id int not null,
    cardapio_item varchar(50) not null,
    quantiade int default 1,
    valorTotal float not null,
		PRIMARY KEY (evento_id, cardapio_empresa_id, cardapio_item),
			INDEX `fk_Buffet_Evento1_idx` (evento_id ASC) VISIBLE,
			INDEX `fk_Buffet_Cardapio1_idx` (cardapio_empresa_id ASC, cardapio_item ASC) VISIBLE,
		CONSTRAINT `fk_Buffet_Evento1` FOREIGN KEY (evento_id) REFERENCES evento (id),        
        CONSTRAINT `fk_Buffet_Cardapio1` FOREIGN KEY (cardapio_empresa_id , cardapio_item) REFERENCES cardapio (empresa_id , item)
);
