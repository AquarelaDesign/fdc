import React from 'react'
import If from '../operator/if'
export default props => (
    <If test={!props.hide}>
        <div className="form-group has-feedback">
            <input {...props.input}
                className='form-control'
                placeholder={props.placeholder}
                readOnly={props.readOnly}
                value={props.value}
                type={props.type} />
            <If test={!props.icon}>
                <span className={`fa fa-${props.icon}
                    form-control-feedback`}></span>
            </If>
        </div>
    </If>
)