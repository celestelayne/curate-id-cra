import React from 'react'
import PropTypes from 'prop-types'

import { CropBox, CropImage, PhotosContainer, Content } from './components'

export class ProductPhotos extends React.Component {
  state = { selectedPhoto: null }

  handleSelectPhoto = (selectedPhoto) => () => {
    this.setState({ selectedPhoto })
  }

  render () {
    const { selectedPhoto } = this.state
    const { photos, defaultImage } = this.props
    const hasManyPhoto = photos.length > 1
    const hasPhoto = photos.length > 0

    return (
      <CropBox p={2}>
        <Content>
          <CropImage src={hasPhoto ? (selectedPhoto || photos[0]).url : defaultImage} />
          {hasManyPhoto ? (
            <PhotosContainer>
              {photos.map((photo, index) => photo.url ? (
                <CropImage
                  selected={selectedPhoto ? selectedPhoto.id === photo.id : index === 0}
                  onClick={this.handleSelectPhoto(photo)}
                  key={photo.id}
                  src={photo.url || defaultImage}
                />
              ) : null)}
            </PhotosContainer>
          ) : null}
        </Content>
      </CropBox>
    )
  }
}

ProductPhotos.propTypes = {
  photos: PropTypes.arrayOf(
    PropTypes.shape({
      url: PropTypes.string,
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    })
  ),
  defaultImage: PropTypes.string,
}

ProductPhotos.defaultProps = {
  defaultImage: '../ProductCard/image.png',
}

export default ProductPhotos
