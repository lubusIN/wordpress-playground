/**
 * Wordpress dependencies.
 */
import { registerBlockType } from '@wordpress/blocks';
import { cog } from '@wordpress/icons';

/**
 * Internal dependencies
 */
import Edit from './edit';
import metadata from './block.json';

/**
 * Every block starts by registering a new block type definition.
 */
registerBlockType(metadata.name, {
	icon: cog,
	edit: Edit,
});