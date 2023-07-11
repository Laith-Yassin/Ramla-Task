import  { useMemo } from 'react'
import PropTypes from 'prop-types'
import { MenuItem, TextField } from '@mui/material'
import styled from '@emotion/styled'

const StyledTextFeild = styled(TextField)({
    '& .MuiSelect-select':{padding:'8px'}
    
})

function GeneralSelect(props) {
    

/**
 * select options
 */
    const options = useMemo(() => {
        return (
            props.items?.map((item) => (
                <MenuItem value= {item.value} key={item.value}>
                {item.label}
                </MenuItem>
            ))
        )
    },[props.items])

  return (
          <StyledTextFeild select {...props} value={props.value} onChange={props.onChange} label={props.label} > 
          {options}         
          </StyledTextFeild>
  )
}

GeneralSelect.propTypes = {
    value:PropTypes.string,
    onChange:PropTypes.func,
    items:PropTypes.arrayOf(PropTypes.shape({
        value:PropTypes.string,
        label:PropTypes.string
    })),
    label:PropTypes.string,
}

export default GeneralSelect
