import React, { useRef, useCallback, useEffect } from 'react'
import PropTypes from 'prop-types'

import Input from '../../common/Input/Input'
import Select from '../../common/Select/Select'

import { selectOptions as selectOption } from '../../components/JobsPanelParameters/jobsPanelParameters.util'
import { isNameNotUnique } from '../../components/JobsPanel/jobsPanel.util'

import { ReactComponent as Checkmark } from '../../images/checkmark.svg'

const EditableParametersRow = ({
  content,
  disabledOptions,
  handleEdit,
  selectedParameter,
  setEditItem,
  setSelectedParameter
}) => {
  const tableRowRef = useRef(null)

  const handleDocumentClick = useCallback(
    event => {
      if (
        !tableRowRef.current?.contains(event.target) &&
        !selectOption.parameterType
          .concat(selectOption.parametersValueType)
          .map(item => item.id)
          .find(id => id === event.path[0].innerText)
      ) {
        setEditItem(false)
        setSelectedParameter({})
      }
    },
    [setEditItem, setSelectedParameter]
  )

  useEffect(() => {
    if (tableRowRef.current) {
      document.addEventListener('click', handleDocumentClick)

      return () => {
        document.removeEventListener('click', handleDocumentClick)
      }
    }
  }, [handleDocumentClick, tableRowRef])

  return (
    <div className="table__row edit-row" ref={tableRowRef}>
      {selectedParameter.isDefault ? (
        <>
          <div className="table__cell table__cell_disabled">
            <div className="data-ellipsis">{selectedParameter.data.name}</div>
          </div>
          <div className="table__cell table__cell_disabled">
            <div className="data-ellipsis">
              {selectedParameter.data.valueType}
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="table__cell table__cell_edit">
            <Input
              density="dense"
              invalid={
                selectedParameter.newName !== selectedParameter.data.name &&
                isNameNotUnique(selectedParameter.newName, content)
              }
              invalidText="Name already exists"
              onChange={name => {
                setSelectedParameter({
                  ...selectedParameter,
                  newName: name
                })
              }}
              type="text"
              value={selectedParameter.newName ?? selectedParameter.data.name}
            />
          </div>
          <div className="table__cell table__cell_edit">
            <Select
              density="dense"
              label={selectedParameter.data.valueType}
              onClick={valueType =>
                setSelectedParameter({
                  ...selectedParameter,
                  data: {
                    ...selectedParameter.data,
                    valueType: valueType
                  }
                })
              }
              options={selectOption.parametersValueType}
            />
          </div>
        </>
      )}
      <div className="table__cell table__cell_edit">
        <Select
          density="dense"
          disabledOptions={disabledOptions}
          label={selectedParameter.data.parameterType}
          onClick={parameterType =>
            setSelectedParameter({
              ...selectedParameter,
              data: { ...selectedParameter.data, parameterType: parameterType }
            })
          }
          options={selectOption.parameterType}
        />
      </div>
      <div className="table__cell table__cell_edit">
        <Input
          density="dense"
          onChange={value => {
            setSelectedParameter({
              ...selectedParameter,
              data: {
                ...selectedParameter.data,
                value: value
              }
            })
          }}
          type="text"
          value={`${selectedParameter.data.value}`}
        />
      </div>
      <div className="table__cell table__cell-actions">
        <button
          className="apply-edit-btn"
          disabled={
            selectedParameter.newName !== selectedParameter.data.name &&
            isNameNotUnique(selectedParameter.newName, content)
          }
          onClick={() => handleEdit(selectedParameter, false)}
        >
          <Checkmark />
        </button>
      </div>
    </div>
  )
}

EditableParametersRow.propTypes = {
  content: PropTypes.array.isRequired,
  disabledOptions: PropTypes.array,
  handleEdit: PropTypes.func.isRequired,
  selectedParameter: PropTypes.shape({}).isRequired,
  setEditItem: PropTypes.func.isRequired,
  setSelectedParameter: PropTypes.func.isRequired
}

export default EditableParametersRow
