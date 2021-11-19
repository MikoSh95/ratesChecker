const offerParser = (
    title,
    city,
    company_name,
    leading_technology,
    experience_level,
    published_at,
    offer_url,
    b2b_from,
    b2b_to,
    permanent_from,
    permanent_to,
    mandate_contract_from,
    mandate_contract_to,
    currency,
    skills,
) => {
    return {
        title,
        city,
        company_name,
        leading_technology,
        experience_level,
        published_at,
        offer_url,
        b2b_from,
        b2b_to,
        permanent_from,
        permanent_to,
        mandate_contract_from,
        mandate_contract_to,
        currency,
        skills,
    }
}

export {
    offerParser,
}