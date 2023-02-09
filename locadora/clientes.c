#define ARQCLI "clientes.txt"

void trocar_caractere_cliente(CLIENTE *c, char de, char para)
{
    trocar_caractere(c->endereco, de, para);
    trocar_caractere(c->nome, de, para);
    trocar_caractere(c->telefone, de, para);
}

void imprimir_cliente(CLIENTE c)
{
    printf("Código: %i\n", c.codcliente);
    printf("Nome: %s\n", c.nome);
    printf("Endereço: %s\n", c.endereco);
    printf("Telefone: %s\n", c.telefone);
    printf("Pontos de fidelidade: %i\n", qtd_pontos(c.codcliente));
}

CLIENTE pesquisar_cliente(int codcliente)
{
    CLIENTE clipesq;
    int achou = 0;
    FILE *arq = fopen(ARQCLI, "r");
    if (arq)
    {
        while(!feof(arq))
        {
            fscanf(arq,"%i %s %s %s\n", &clipesq.codcliente, clipesq.endereco, clipesq.nome, clipesq.telefone);

            trocar_caractere_cliente(&clipesq, ' ', '+');

            if (clipesq.codcliente==codcliente)
            {
                achou = 1;
                break;
            }
        }
        fclose(arq);
    }
    if (achou==0)
        clipesq.codcliente = -1;
    return clipesq;
}



void listar_cliente()
{
    int codcliente;
    CLIENTE clipesq;

    printf("\n\nPESQUISAR CLIENTE\n\n");

    printf("Código do cliente: ");
    codcliente = obter_inteiro(1, 30000);
    clipesq = pesquisar_cliente(codcliente);

    if (clipesq.codcliente!=-1)
    {
        trocar_caractere_cliente(&clipesq, '+', ' ');
        imprimir_cliente(clipesq);
    }
    else
        printf("Código não encontrado\n");

    esperar();
}

void listar_clientes()
{
    CLIENTE clipesq;
    FILE *arq = fopen(ARQCLI, "r");

    printf("\n\nLISTAGEM DE CLIENTES\n\n");

    if (arq)
    {
        while(!feof(arq))
        {
            fscanf(arq,"%i %s %s %s\n", &clipesq.codcliente, clipesq.endereco, clipesq.nome, clipesq.telefone);

            trocar_caractere_cliente(&clipesq, '+', ' ');

            imprimir_cliente(clipesq);
            printf("\n");
        }
        fclose(arq);
    }
    else
    {
        printf("Nenhum registro encontrado\n");
    }

    esperar();
}

void cadastrar_cliente()
{
    FILE *arq;
    CLIENTE clinovo, clipesq;
    printf("\n\nCADASTRAR CLIENTE\n\n");
    printf("Código: ");
    do {
        clinovo.codcliente = obter_inteiro(1,30000);
        clipesq = pesquisar_cliente(clinovo.codcliente);
        if (clipesq.codcliente==-1)
        {
            printf("Nome: ");
            obter_texto(clinovo.nome, 99);

            printf("Endereço: ");
            obter_texto(clinovo.endereco, 99);

            printf("Telefone: ");
            obter_texto(clinovo.telefone, 14);

            trocar_caractere_cliente(&clinovo, ' ', '+');

            arq = fopen(ARQCLI, "a+");
            fprintf(arq, "%i %s %s %s\n", clinovo.codcliente, clinovo.nome, clinovo.endereco, clinovo.telefone);
            fclose(arq);

            clipesq.codcliente = 0; // para sair do loop

            printf("\nCadastrado com sucesso!\n");
        }
        else
        {
            printf("Código já existente!\n");
        }
    } while(clipesq.codcliente==-1);

    esperar();
}


/*
Implemente também uma função para pesquisar os clientes que atingiram um total de 500
pontos no programa de fidelidade, esses clientes serão premiados e receberão um kit da LocaMais.
*/
void listar_clientes_locamais()
{
    CLIENTE clipesq;
    FILE *arq = fopen(ARQCLI, "r");

    printf("\n\nLISTAGEM DE CLIENTES - LocaMais\n\n");

    if (arq)
    {
        while(!feof(arq))
        {
            fscanf(arq,"%i %s %s %s\n", &clipesq.codcliente, clipesq.endereco, clipesq.nome, clipesq.telefone);

            if (qtd_pontos(clipesq.codcliente)>=500)
            {
                trocar_caractere_cliente(&clipesq, '+', ' ');
                imprimir_cliente(clipesq);
                printf("\n");
            }
        }
        fclose(arq);
    }
    else
    {
        printf("Nenhum registro encontrado\n");
    }
    esperar();
}
