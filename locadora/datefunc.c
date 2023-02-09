int obterParteData(char *data, int parte)
{
    int valor, pulo, tam = 2;
    char *strparte = malloc(sizeof(char)*2);
    strparte[0] = '\0';

    if (parte==1)
        pulo = 0;
    else if (parte==2)
        pulo = 3;
    else {
        pulo = 6;
        tam = 4;
    }

    strncpy(strparte, data + pulo, tam);
    strparte[tam] = '\0';
    valor = atoi(strparte);

    free(strparte);

    return valor;
}



int getDia(char *data) {
    return obterParteData(data, 1);
}

int getMes(char *data) {
    return obterParteData(data, 2);
}

int getAno(char *data) {
    return obterParteData(data, 3);
}


int IsValidDate(char *data)
{
    int ret = 0;
    if (strlen(data)==10)
        ret = IsValid(getDia(data), getMes(data), getAno(data));
    return ret;
}

int DataDiferenca(char *d1, char *d2)
{
    return DatDif(getDia(d1), getMes(d1), getAno(d1), getDia(d2), getMes(d2), getAno(d2));
}



/*
------------------------------------------------------------------------
FONTE: https://stackoverflow.com/questions/13932909/difference-between-two-dates-in-c
------------------------------------------------------------------------
*/

//Day of the Year
int rbdug(int d,int m,int y)
{ int a,r[13];
  r[1] = 0; r[2] = 31; r[3] = 59;
  r[4] = 90; r[5] = 120; r[6] = 151;
  r[7] = 181; r[8] = 212; r[9] = 243;
  r[10]= 273; r[11]= 304; r[12]= 334;
  a=r[m]+d;
  if(((((y%400)==0)||((y%100)!=0))
      &&((y%4)==0))&&(m>2)) a+=1;
  return(a);
}//end rbdug


int Godn(int yy1,int yy2)
{ int jj,bb;
  bb=0;
  for(jj=yy1;jj<yy2;jj++){
    bb+=365;
    if(((((jj%400)==0)||((jj%100)!=0))
      &&((jj%4)==0))) bb+=1;
  }
  return(bb);
}// end Godn


int DatDif(int d1,int m1,int y1,int d2,int m2,int y2)
{ int suma;
  suma=rbdug(d2,m2,y2) - rbdug(d1,m1,y1);
  if(y1 != y2){
    if(y1 < y2){
      suma+=Godn(y1,y2);
    }else{
      suma-=Godn(y2,y1);
    }
  }
  return(suma);
}// end DatDif




//date validity
int IsValid(int dd,int mm,int yy)
{ int v[13];
  if((0 < mm) && (mm < 13)){
    v[1] = 32; v[2] = 29; v[3] = 32;
    v[4] = 31; v[5] = 32; v[6] = 31;
    v[7] = 32; v[8] = 32; v[9] = 31;
    v[10]= 32; v[11]= 31; v[12]= 32;
    if(((((yy%400)==0)||((yy%100)!=0))
      &&((yy%4)==0))) v[2]+=1;
    if((0 < dd) && (dd < v[mm])){
      return(1);
    }else{
      return(0);
    }
  }else{
    return(0);
  }
}//end IsValid

// ------------------------------------------------------------------------
