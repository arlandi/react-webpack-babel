export function getOption( optionName ) {
  return fetch( `/wp-admin/admin-ajax.php?action=get_option&option_name=${ optionName }` )
    .then( ( response ) => response.json() );
}

export function updateOption( optionName, value ) {
  const payload = new FormData();
  payload.append( 'option_name', optionName );
  payload.append( 'value', JSON.stringify( value ) );

  return fetch( '/wp-admin/admin-ajax.php?action=update_option', {
    method: 'POST',
    body: payload,
  } ).then( ( response ) => response.json() );
}

export function getTerms( taxonomy ) {
  return fetch( `/wp-admin/admin-ajax.php?action=get_terms&taxonomy=${ taxonomy }` )
    .then( ( response ) => response.json() );
}