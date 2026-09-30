// `@wordpress/element` does not re-export `version`, and reading it from a
// shared script would tell us the version of that script rather than of the
// React actually rendering this bundled package.
// eslint-disable-next-line @typescript-eslint/no-restricted-imports
import { version } from 'react';

const majorVersion = parseInt( version, 10 );

/**
 * Returns a value for the `inert` prop that the running version of React
 * renders as the `inert` HTML attribute.
 *
 * React 19 handles `inert` as a boolean attribute: a truthy value renders as
 * `inert=""` and a falsy one removes the attribute. React 18 knows nothing
 * about `inert` and drops `inert={ true }`, so it has to be given the string
 * `'true'` instead.
 *
 * The return type describes what React 19 accepts. `inert` is missing from
 * React 18's HTML attribute types altogether, so a TypeScript call site still
 * needs a `@ts-expect-error` until those types are upgraded.
 *
 * @example
 * ```tsx
 * // @ts-expect-error `inert` is not declared in React 18's HTML attribute types.
 * <div inert={ inertValue( isDisabled ) }>{ children }</div>
 * ```
 *
 * @param value Whether the element and its subtree should be inert.
 * @return The value to pass to the `inert` prop.
 */
export function inertValue( value?: boolean ): boolean | undefined {
	if ( majorVersion >= 19 ) {
		return value;
	}

	return ( value ? 'true' : undefined ) as unknown as boolean | undefined;
}
