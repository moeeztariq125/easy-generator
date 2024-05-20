
export interface FormValues {
    email: string;
    dob: string;
    firstName: string;
    lastName: string;
    password: string;
}

interface FormConfig{
    col1:{
        type:string;
        name: keyof FormValues;
        id:string;
        value:string;
        disabled:boolean;
        placeholder:string;
        label:string
    }[];
    col2:{
        type:string;
        name: keyof FormValues;
        id:string;
        value:string;
        disabled:boolean;
        placeholder:string;
        label:string;
    }[]
}

export const formConfig:FormConfig= {
    
    col1:[
        {
            type:'email',
            name:'email',
            id:'email',
            value:'email',
            disabled:true,
            placeholder:'Email Address',
            label:'Email Address'
        },
        {
            type:'text',
            name:'firstName',
            id:'firstname',
            value:'firstname',
            disabled:false,
            placeholder:'First Name',
            label:'First Name'
        },
        {
            type:'password',
            name:'password',
            id:'password',
            value:'password',
            disabled:false,
            placeholder:'Password',
            label:'password'
        }
    ],
    col2:[
        {
            type:'date',
            name:'dob',
            id:'dob',
            value:'dob',
            disabled:false,
            placeholder:'Date Of Birth',
            label:'Date Of Birth'
        },
        {
            type:'text',
            name:'lastName',
            id:'lastName',
            value:'lastName',
            disabled:false,
            placeholder:'Last Name',
            label:'Last Name'
        }
    ]


}