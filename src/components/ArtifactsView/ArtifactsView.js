import React from 'react'
import PropTypes from 'prop-types'
import ArtifactsFilerMenu from '../ArtifacstFilterMenu/ArtifactsFilterMenu'
import Loader from '../../common/Loader/Loader'
import ArtifactsTable from '../../elements/ArtifactsTable/ArtifactsTable'

import './artifactsview.scss'

const ArtifactView = ({ loading, refresh, onChangeFilter, ...props }) => {
  return (
    <>
      <div className="menu_container">
        <div className="menu_item active">Monitor</div>
        {/*<div className="menu-item">Edit</div>*/}
        {/*<div className="menu-item">Create</div>*/}
      </div>
      <div className="artifacts_table">
        <ArtifactsFilerMenu
          refreshArtifacts={refresh}
          onChangeFilter={onChangeFilter}
        />
        <div className="artifacts_table_container">
          {loading ? <Loader /> : <ArtifactsTable {...props} />}
        </div>
      </div>
    </>
  )
}

ArtifactView.propTypes = {
  loading: PropTypes.bool,
  artifacts: PropTypes.array.isRequired,
  refresh: PropTypes.func.isRequired,
  onChangeFilter: PropTypes.func.isRequired
}

export default ArtifactView
