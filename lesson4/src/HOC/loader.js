import React, { Component } from 'react'

export default function (CustomComponent, isLoadFnc) {
    return class extends Component {

        render() {
            const shouldShowLoader = this.isLoading()
            if (shouldShowLoader) return <h2>Loading...</h2>
            return <CustomComponent
                {...this.props}
            />
        }

        isLoading() {
            return isLoadFnc ? isLoadFnc(this.props) : this.props.loading
        }
    }
}
