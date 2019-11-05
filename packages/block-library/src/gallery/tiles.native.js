/**
 * External dependencies
 */
import { View } from 'react-native';

/**
 * WordPress dependencies
 */
import { Children } from '@wordpress/element';

const containerStyle = {
	flexDirection: 'row',
	flexWrap: 'wrap',
};

const tileStyle = {
	overflow: 'hidden',
	flexDirection: 'row',
	alignItems: 'center',
	borderColor: 'transparent',
};

function Tiles( props ) {
	const {
		columns,
		children,
		spacing = 10,
	} = props;

	const tileCount = Children.count( children );
	const lastTile = tileCount - 1;
	const lastRow = Math.floor( lastTile / columns );

	const wrappedChildren = Children.map( children, ( child, index ) => {
		const row = Math.floor( index / columns );
		const rowLength = row === lastRow ? ( lastTile % columns ) + 1 : columns;
		const indexInRow = index % columns;

		return (
			<View style={ [ tileStyle, {
				width: ( ( 1 / rowLength ) * 100 ) + '%',
				borderLeftWidth: spacing * ( indexInRow / rowLength ),
				borderRightWidth: spacing * ( 1 - ( ( indexInRow + 1 ) / rowLength ) ),
				borderTopWidth: row === 0 ? 0 : spacing / 2,
				borderBottomWidth: row === lastRow ? 0 : spacing / 2,
			} ] }>
				{ child }
			</View>
		);
	} );

	return (
		<View style={ containerStyle }>
			{ wrappedChildren }
		</View>
	);
}

export default Tiles;