(() => {
  window.DIO_PRICING_CENSUS = {
  "schema": "dio.public_pricing_census.v1",
  "source_repo": "Byron2306/DIO-Full-Audit",
  "source_commit": "46a5a7f8c981a2e15f9c2c053ef52b6f512985ca",
  "source_truth": "governed commercial pricing hypotheses",
  "product_count": 68,
  "tier_policy": {
    "tier_ids": [
      "individual_professional",
      "team_department",
      "enterprise_programme"
    ],
    "tiers": [
      {
        "tier_id": "individual_professional",
        "label": "Individual / Professional",
        "buyer_classes": [
          "C0",
          "C1"
        ],
        "reference_position": 0
      },
      {
        "tier_id": "team_department",
        "label": "Team / Department",
        "buyer_classes": [
          "C2",
          "C3"
        ],
        "reference_position": 0.5
      },
      {
        "tier_id": "enterprise_programme",
        "label": "Enterprise / Programme",
        "buyer_classes": [
          "C4",
          "C5"
        ],
        "reference_position": 1
      }
    ],
    "truth_boundary": "Tier prices are governed reference points within each product band, not validated willingness-to-pay claims."
  },
  "products": [
    {
      "slug": "accessible-publish",
      "product_id": "accessible_publish",
      "name": "Accessible Publish",
      "buyer_classes": [
        "C1",
        "C2",
        "C3",
        "C4"
      ],
      "pricing_model": "document_scope",
      "primary_scope_unit": "page",
      "governed_reference_band_zar": {
        "min": 500,
        "max": 3000
      },
      "commercial_tiers": [
        {
          "tier_id": "individual_professional",
          "label": "Individual / Professional",
          "buyer_classes": [
            "C0",
            "C1"
          ],
          "eligible_buyer_classes": [
            "C1"
          ],
          "available": true,
          "reference_amount_zar": 500,
          "pricing_truth": "GOVERNED_REFERENCE_POINT",
          "market_validation": "UNPROVED",
          "quote_issue_authority": false,
          "invoice_issue_authority": false,
          "band_mutation_authority": false,
          "external_effects": false
        },
        {
          "tier_id": "team_department",
          "label": "Team / Department",
          "buyer_classes": [
            "C2",
            "C3"
          ],
          "eligible_buyer_classes": [
            "C2",
            "C3"
          ],
          "available": true,
          "reference_amount_zar": 1750,
          "pricing_truth": "GOVERNED_REFERENCE_POINT",
          "market_validation": "UNPROVED",
          "quote_issue_authority": false,
          "invoice_issue_authority": false,
          "band_mutation_authority": false,
          "external_effects": false
        },
        {
          "tier_id": "enterprise_programme",
          "label": "Enterprise / Programme",
          "buyer_classes": [
            "C4",
            "C5"
          ],
          "eligible_buyer_classes": [
            "C4"
          ],
          "available": true,
          "reference_amount_zar": 3000,
          "pricing_truth": "GOVERNED_REFERENCE_POINT",
          "market_validation": "UNPROVED",
          "quote_issue_authority": false,
          "invoice_issue_authority": false,
          "band_mutation_authority": false,
          "external_effects": false
        }
      ],
      "pricing_state": "HYPOTHESIS",
      "commercial_validation": "UNPROVED",
      "customers_will_pay": "UNPROVED",
      "authority_created": false,
      "external_effects": false
    },
    {
      "slug": "agent-authority",
      "product_id": "agent_authority",
      "name": "Agent Authority",
      "buyer_classes": [
        "C2",
        "C3",
        "C4",
        "C5"
      ],
      "pricing_model": "governance_setup",
      "primary_scope_unit": "agent",
      "governed_reference_band_zar": {
        "min": 7500,
        "max": 50000
      },
      "commercial_tiers": [
        {
          "tier_id": "individual_professional",
          "label": "Individual / Professional",
          "buyer_classes": [
            "C0",
            "C1"
          ],
          "eligible_buyer_classes": [],
          "available": false,
          "reference_amount_zar": null,
          "pricing_truth": "GOVERNED_REFERENCE_POINT",
          "market_validation": "UNPROVED",
          "quote_issue_authority": false,
          "invoice_issue_authority": false,
          "band_mutation_authority": false,
          "external_effects": false
        },
        {
          "tier_id": "team_department",
          "label": "Team / Department",
          "buyer_classes": [
            "C2",
            "C3"
          ],
          "eligible_buyer_classes": [
            "C2",
            "C3"
          ],
          "available": true,
          "reference_amount_zar": 28750,
          "pricing_truth": "GOVERNED_REFERENCE_POINT",
          "market_validation": "UNPROVED",
          "quote_issue_authority": false,
          "invoice_issue_authority": false,
          "band_mutation_authority": false,
          "external_effects": false
        },
        {
          "tier_id": "enterprise_programme",
          "label": "Enterprise / Programme",
          "buyer_classes": [
            "C4",
            "C5"
          ],
          "eligible_buyer_classes": [
            "C4",
            "C5"
          ],
          "available": true,
          "reference_amount_zar": 50000,
          "pricing_truth": "GOVERNED_REFERENCE_POINT",
          "market_validation": "UNPROVED",
          "quote_issue_authority": false,
          "invoice_issue_authority": false,
          "band_mutation_authority": false,
          "external_effects": false
        }
      ],
      "pricing_state": "HYPOTHESIS",
      "commercial_validation": "UNPROVED",
      "customers_will_pay": "UNPROVED",
      "authority_created": false,
      "external_effects": false
    },
    {
      "slug": "ai-incidentroom",
      "product_id": "ai_incidentroom",
      "name": "AI IncidentRoom",
      "buyer_classes": [
        "C2",
        "C3",
        "C4",
        "C5"
      ],
      "pricing_model": "incident_case",
      "primary_scope_unit": "incident",
      "governed_reference_band_zar": {
        "min": 7500,
        "max": 50000
      },
      "commercial_tiers": [
        {
          "tier_id": "individual_professional",
          "label": "Individual / Professional",
          "buyer_classes": [
            "C0",
            "C1"
          ],
          "eligible_buyer_classes": [],
          "available": false,
          "reference_amount_zar": null,
          "pricing_truth": "GOVERNED_REFERENCE_POINT",
          "market_validation": "UNPROVED",
          "quote_issue_authority": false,
          "invoice_issue_authority": false,
          "band_mutation_authority": false,
          "external_effects": false
        },
        {
          "tier_id": "team_department",
          "label": "Team / Department",
          "buyer_classes": [
            "C2",
            "C3"
          ],
          "eligible_buyer_classes": [
            "C2",
            "C3"
          ],
          "available": true,
          "reference_amount_zar": 28750,
          "pricing_truth": "GOVERNED_REFERENCE_POINT",
          "market_validation": "UNPROVED",
          "quote_issue_authority": false,
          "invoice_issue_authority": false,
          "band_mutation_authority": false,
          "external_effects": false
        },
        {
          "tier_id": "enterprise_programme",
          "label": "Enterprise / Programme",
          "buyer_classes": [
            "C4",
            "C5"
          ],
          "eligible_buyer_classes": [
            "C4",
            "C5"
          ],
          "available": true,
          "reference_amount_zar": 50000,
          "pricing_truth": "GOVERNED_REFERENCE_POINT",
          "market_validation": "UNPROVED",
          "quote_issue_authority": false,
          "invoice_issue_authority": false,
          "band_mutation_authority": false,
          "external_effects": false
        }
      ],
      "pricing_state": "HYPOTHESIS",
      "commercial_validation": "UNPROVED",
      "customers_will_pay": "UNPROVED",
      "authority_created": false,
      "external_effects": false
    },
    {
      "slug": "article-publication",
      "product_id": "article_publication",
      "name": "Article Publication",
      "buyer_classes": [
        "C0",
        "C1",
        "C2",
        "C3"
      ],
      "pricing_model": "publication_package",
      "primary_scope_unit": "article_page",
      "governed_reference_band_zar": {
        "min": 750,
        "max": 3500
      },
      "commercial_tiers": [
        {
          "tier_id": "individual_professional",
          "label": "Individual / Professional",
          "buyer_classes": [
            "C0",
            "C1"
          ],
          "eligible_buyer_classes": [
            "C0",
            "C1"
          ],
          "available": true,
          "reference_amount_zar": 750,
          "pricing_truth": "GOVERNED_REFERENCE_POINT",
          "market_validation": "UNPROVED",
          "quote_issue_authority": false,
          "invoice_issue_authority": false,
          "band_mutation_authority": false,
          "external_effects": false
        },
        {
          "tier_id": "team_department",
          "label": "Team / Department",
          "buyer_classes": [
            "C2",
            "C3"
          ],
          "eligible_buyer_classes": [
            "C2",
            "C3"
          ],
          "available": true,
          "reference_amount_zar": 2100,
          "pricing_truth": "GOVERNED_REFERENCE_POINT",
          "market_validation": "UNPROVED",
          "quote_issue_authority": false,
          "invoice_issue_authority": false,
          "band_mutation_authority": false,
          "external_effects": false
        },
        {
          "tier_id": "enterprise_programme",
          "label": "Enterprise / Programme",
          "buyer_classes": [
            "C4",
            "C5"
          ],
          "eligible_buyer_classes": [],
          "available": false,
          "reference_amount_zar": null,
          "pricing_truth": "GOVERNED_REFERENCE_POINT",
          "market_validation": "UNPROVED",
          "quote_issue_authority": false,
          "invoice_issue_authority": false,
          "band_mutation_authority": false,
          "external_effects": false
        }
      ],
      "pricing_state": "HYPOTHESIS",
      "commercial_validation": "UNPROVED",
      "customers_will_pay": "UNPROVED",
      "authority_created": false,
      "external_effects": false
    },
    {
      "slug": "article-publication-studio",
      "product_id": "article_publication_studio",
      "name": "Article Publication Studio",
      "buyer_classes": [
        "C1",
        "C2",
        "C3",
        "C4"
      ],
      "pricing_model": "studio_project",
      "primary_scope_unit": "publication_package",
      "governed_reference_band_zar": {
        "min": 1500,
        "max": 7500
      },
      "commercial_tiers": [
        {
          "tier_id": "individual_professional",
          "label": "Individual / Professional",
          "buyer_classes": [
            "C0",
            "C1"
          ],
          "eligible_buyer_classes": [
            "C1"
          ],
          "available": true,
          "reference_amount_zar": 1500,
          "pricing_truth": "GOVERNED_REFERENCE_POINT",
          "market_validation": "UNPROVED",
          "quote_issue_authority": false,
          "invoice_issue_authority": false,
          "band_mutation_authority": false,
          "external_effects": false
        },
        {
          "tier_id": "team_department",
          "label": "Team / Department",
          "buyer_classes": [
            "C2",
            "C3"
          ],
          "eligible_buyer_classes": [
            "C2",
            "C3"
          ],
          "available": true,
          "reference_amount_zar": 4500,
          "pricing_truth": "GOVERNED_REFERENCE_POINT",
          "market_validation": "UNPROVED",
          "quote_issue_authority": false,
          "invoice_issue_authority": false,
          "band_mutation_authority": false,
          "external_effects": false
        },
        {
          "tier_id": "enterprise_programme",
          "label": "Enterprise / Programme",
          "buyer_classes": [
            "C4",
            "C5"
          ],
          "eligible_buyer_classes": [
            "C4"
          ],
          "available": true,
          "reference_amount_zar": 7500,
          "pricing_truth": "GOVERNED_REFERENCE_POINT",
          "market_validation": "UNPROVED",
          "quote_issue_authority": false,
          "invoice_issue_authority": false,
          "band_mutation_authority": false,
          "external_effects": false
        }
      ],
      "pricing_state": "HYPOTHESIS",
      "commercial_validation": "UNPROVED",
      "customers_will_pay": "UNPROVED",
      "authority_created": false,
      "external_effects": false
    },
    {
      "slug": "assuranceroom",
      "product_id": "assuranceroom",
      "name": "AssuranceRoom",
      "buyer_classes": [
        "C2",
        "C3",
        "C4",
        "C5"
      ],
      "pricing_model": "setup_plus_volume",
      "primary_scope_unit": "assurance_control",
      "governed_reference_band_zar": {
        "min": 5000,
        "max": 30000
      },
      "commercial_tiers": [
        {
          "tier_id": "individual_professional",
          "label": "Individual / Professional",
          "buyer_classes": [
            "C0",
            "C1"
          ],
          "eligible_buyer_classes": [],
          "available": false,
          "reference_amount_zar": null,
          "pricing_truth": "GOVERNED_REFERENCE_POINT",
          "market_validation": "UNPROVED",
          "quote_issue_authority": false,
          "invoice_issue_authority": false,
          "band_mutation_authority": false,
          "external_effects": false
        },
        {
          "tier_id": "team_department",
          "label": "Team / Department",
          "buyer_classes": [
            "C2",
            "C3"
          ],
          "eligible_buyer_classes": [
            "C2",
            "C3"
          ],
          "available": true,
          "reference_amount_zar": 17500,
          "pricing_truth": "GOVERNED_REFERENCE_POINT",
          "market_validation": "UNPROVED",
          "quote_issue_authority": false,
          "invoice_issue_authority": false,
          "band_mutation_authority": false,
          "external_effects": false
        },
        {
          "tier_id": "enterprise_programme",
          "label": "Enterprise / Programme",
          "buyer_classes": [
            "C4",
            "C5"
          ],
          "eligible_buyer_classes": [
            "C4",
            "C5"
          ],
          "available": true,
          "reference_amount_zar": 30000,
          "pricing_truth": "GOVERNED_REFERENCE_POINT",
          "market_validation": "UNPROVED",
          "quote_issue_authority": false,
          "invoice_issue_authority": false,
          "band_mutation_authority": false,
          "external_effects": false
        }
      ],
      "pricing_state": "HYPOTHESIS",
      "commercial_validation": "UNPROVED",
      "customers_will_pay": "UNPROVED",
      "authority_created": false,
      "external_effects": false
    },
    {
      "slug": "auditproof",
      "product_id": "auditproof",
      "name": "AuditProof",
      "buyer_classes": [
        "C1",
        "C2",
        "C3",
        "C4",
        "C5"
      ],
      "pricing_model": "setup_plus_volume",
      "primary_scope_unit": "control_evidence_item",
      "governed_reference_band_zar": {
        "min": 1500,
        "max": 7500
      },
      "commercial_tiers": [
        {
          "tier_id": "individual_professional",
          "label": "Individual / Professional",
          "buyer_classes": [
            "C0",
            "C1"
          ],
          "eligible_buyer_classes": [
            "C1"
          ],
          "available": true,
          "reference_amount_zar": 1500,
          "pricing_truth": "GOVERNED_REFERENCE_POINT",
          "market_validation": "UNPROVED",
          "quote_issue_authority": false,
          "invoice_issue_authority": false,
          "band_mutation_authority": false,
          "external_effects": false
        },
        {
          "tier_id": "team_department",
          "label": "Team / Department",
          "buyer_classes": [
            "C2",
            "C3"
          ],
          "eligible_buyer_classes": [
            "C2",
            "C3"
          ],
          "available": true,
          "reference_amount_zar": 4500,
          "pricing_truth": "GOVERNED_REFERENCE_POINT",
          "market_validation": "UNPROVED",
          "quote_issue_authority": false,
          "invoice_issue_authority": false,
          "band_mutation_authority": false,
          "external_effects": false
        },
        {
          "tier_id": "enterprise_programme",
          "label": "Enterprise / Programme",
          "buyer_classes": [
            "C4",
            "C5"
          ],
          "eligible_buyer_classes": [
            "C4",
            "C5"
          ],
          "available": true,
          "reference_amount_zar": 7500,
          "pricing_truth": "GOVERNED_REFERENCE_POINT",
          "market_validation": "UNPROVED",
          "quote_issue_authority": false,
          "invoice_issue_authority": false,
          "band_mutation_authority": false,
          "external_effects": false
        }
      ],
      "pricing_state": "HYPOTHESIS",
      "commercial_validation": "UNPROVED",
      "customers_will_pay": "UNPROVED",
      "authority_created": false,
      "external_effects": false
    },
    {
      "slug": "campaign-lab",
      "product_id": "campaign_lab",
      "name": "Campaign Lab",
      "buyer_classes": [
        "C1",
        "C2",
        "C3",
        "C4"
      ],
      "pricing_model": "experiment",
      "primary_scope_unit": "campaign",
      "governed_reference_band_zar": {
        "min": 1000,
        "max": 5000
      },
      "commercial_tiers": [
        {
          "tier_id": "individual_professional",
          "label": "Individual / Professional",
          "buyer_classes": [
            "C0",
            "C1"
          ],
          "eligible_buyer_classes": [
            "C1"
          ],
          "available": true,
          "reference_amount_zar": 1000,
          "pricing_truth": "GOVERNED_REFERENCE_POINT",
          "market_validation": "UNPROVED",
          "quote_issue_authority": false,
          "invoice_issue_authority": false,
          "band_mutation_authority": false,
          "external_effects": false
        },
        {
          "tier_id": "team_department",
          "label": "Team / Department",
          "buyer_classes": [
            "C2",
            "C3"
          ],
          "eligible_buyer_classes": [
            "C2",
            "C3"
          ],
          "available": true,
          "reference_amount_zar": 3000,
          "pricing_truth": "GOVERNED_REFERENCE_POINT",
          "market_validation": "UNPROVED",
          "quote_issue_authority": false,
          "invoice_issue_authority": false,
          "band_mutation_authority": false,
          "external_effects": false
        },
        {
          "tier_id": "enterprise_programme",
          "label": "Enterprise / Programme",
          "buyer_classes": [
            "C4",
            "C5"
          ],
          "eligible_buyer_classes": [
            "C4"
          ],
          "available": true,
          "reference_amount_zar": 5000,
          "pricing_truth": "GOVERNED_REFERENCE_POINT",
          "market_validation": "UNPROVED",
          "quote_issue_authority": false,
          "invoice_issue_authority": false,
          "band_mutation_authority": false,
          "external_effects": false
        }
      ],
      "pricing_state": "HYPOTHESIS",
      "commercial_validation": "UNPROVED",
      "customers_will_pay": "UNPROVED",
      "authority_created": false,
      "external_effects": false
    },
    {
      "slug": "certificationproof",
      "product_id": "certificationproof",
      "name": "CertificationProof",
      "buyer_classes": [
        "C2",
        "C3",
        "C4",
        "C5"
      ],
      "pricing_model": "setup_plus_volume",
      "primary_scope_unit": "certification_requirement",
      "governed_reference_band_zar": {
        "min": 4000,
        "max": 20000
      },
      "commercial_tiers": [
        {
          "tier_id": "individual_professional",
          "label": "Individual / Professional",
          "buyer_classes": [
            "C0",
            "C1"
          ],
          "eligible_buyer_classes": [],
          "available": false,
          "reference_amount_zar": null,
          "pricing_truth": "GOVERNED_REFERENCE_POINT",
          "market_validation": "UNPROVED",
          "quote_issue_authority": false,
          "invoice_issue_authority": false,
          "band_mutation_authority": false,
          "external_effects": false
        },
        {
          "tier_id": "team_department",
          "label": "Team / Department",
          "buyer_classes": [
            "C2",
            "C3"
          ],
          "eligible_buyer_classes": [
            "C2",
            "C3"
          ],
          "available": true,
          "reference_amount_zar": 12000,
          "pricing_truth": "GOVERNED_REFERENCE_POINT",
          "market_validation": "UNPROVED",
          "quote_issue_authority": false,
          "invoice_issue_authority": false,
          "band_mutation_authority": false,
          "external_effects": false
        },
        {
          "tier_id": "enterprise_programme",
          "label": "Enterprise / Programme",
          "buyer_classes": [
            "C4",
            "C5"
          ],
          "eligible_buyer_classes": [
            "C4",
            "C5"
          ],
          "available": true,
          "reference_amount_zar": 20000,
          "pricing_truth": "GOVERNED_REFERENCE_POINT",
          "market_validation": "UNPROVED",
          "quote_issue_authority": false,
          "invoice_issue_authority": false,
          "band_mutation_authority": false,
          "external_effects": false
        }
      ],
      "pricing_state": "HYPOTHESIS",
      "commercial_validation": "UNPROVED",
      "customers_will_pay": "UNPROVED",
      "authority_created": false,
      "external_effects": false
    },
    {
      "slug": "changeproof",
      "product_id": "changeproof",
      "name": "ChangeProof",
      "buyer_classes": [
        "C2",
        "C3",
        "C4",
        "C5"
      ],
      "pricing_model": "per_change",
      "primary_scope_unit": "change_record",
      "governed_reference_band_zar": {
        "min": 2500,
        "max": 15000
      },
      "commercial_tiers": [
        {
          "tier_id": "individual_professional",
          "label": "Individual / Professional",
          "buyer_classes": [
            "C0",
            "C1"
          ],
          "eligible_buyer_classes": [],
          "available": false,
          "reference_amount_zar": null,
          "pricing_truth": "GOVERNED_REFERENCE_POINT",
          "market_validation": "UNPROVED",
          "quote_issue_authority": false,
          "invoice_issue_authority": false,
          "band_mutation_authority": false,
          "external_effects": false
        },
        {
          "tier_id": "team_department",
          "label": "Team / Department",
          "buyer_classes": [
            "C2",
            "C3"
          ],
          "eligible_buyer_classes": [
            "C2",
            "C3"
          ],
          "available": true,
          "reference_amount_zar": 8750,
          "pricing_truth": "GOVERNED_REFERENCE_POINT",
          "market_validation": "UNPROVED",
          "quote_issue_authority": false,
          "invoice_issue_authority": false,
          "band_mutation_authority": false,
          "external_effects": false
        },
        {
          "tier_id": "enterprise_programme",
          "label": "Enterprise / Programme",
          "buyer_classes": [
            "C4",
            "C5"
          ],
          "eligible_buyer_classes": [
            "C4",
            "C5"
          ],
          "available": true,
          "reference_amount_zar": 15000,
          "pricing_truth": "GOVERNED_REFERENCE_POINT",
          "market_validation": "UNPROVED",
          "quote_issue_authority": false,
          "invoice_issue_authority": false,
          "band_mutation_authority": false,
          "external_effects": false
        }
      ],
      "pricing_state": "HYPOTHESIS",
      "commercial_validation": "UNPROVED",
      "customers_will_pay": "UNPROVED",
      "authority_created": false,
      "external_effects": false
    },
    {
      "slug": "contract-desk",
      "product_id": "contract_desk",
      "name": "Contract Desk",
      "buyer_classes": [
        "C0",
        "C1",
        "C2",
        "C3"
      ],
      "pricing_model": "per_contract",
      "primary_scope_unit": "contract_clause",
      "governed_reference_band_zar": {
        "min": 750,
        "max": 3500
      },
      "commercial_tiers": [
        {
          "tier_id": "individual_professional",
          "label": "Individual / Professional",
          "buyer_classes": [
            "C0",
            "C1"
          ],
          "eligible_buyer_classes": [
            "C0",
            "C1"
          ],
          "available": true,
          "reference_amount_zar": 750,
          "pricing_truth": "GOVERNED_REFERENCE_POINT",
          "market_validation": "UNPROVED",
          "quote_issue_authority": false,
          "invoice_issue_authority": false,
          "band_mutation_authority": false,
          "external_effects": false
        },
        {
          "tier_id": "team_department",
          "label": "Team / Department",
          "buyer_classes": [
            "C2",
            "C3"
          ],
          "eligible_buyer_classes": [
            "C2",
            "C3"
          ],
          "available": true,
          "reference_amount_zar": 2100,
          "pricing_truth": "GOVERNED_REFERENCE_POINT",
          "market_validation": "UNPROVED",
          "quote_issue_authority": false,
          "invoice_issue_authority": false,
          "band_mutation_authority": false,
          "external_effects": false
        },
        {
          "tier_id": "enterprise_programme",
          "label": "Enterprise / Programme",
          "buyer_classes": [
            "C4",
            "C5"
          ],
          "eligible_buyer_classes": [],
          "available": false,
          "reference_amount_zar": null,
          "pricing_truth": "GOVERNED_REFERENCE_POINT",
          "market_validation": "UNPROVED",
          "quote_issue_authority": false,
          "invoice_issue_authority": false,
          "band_mutation_authority": false,
          "external_effects": false
        }
      ],
      "pricing_state": "HYPOTHESIS",
      "commercial_validation": "UNPROVED",
      "customers_will_pay": "UNPROVED",
      "authority_created": false,
      "external_effects": false
    },
    {
      "slug": "contractproof",
      "product_id": "contractproof",
      "name": "ContractProof",
      "buyer_classes": [
        "C0",
        "C1",
        "C2",
        "C3",
        "C4"
      ],
      "pricing_model": "per_contract",
      "primary_scope_unit": "contract_clause",
      "governed_reference_band_zar": {
        "min": 750,
        "max": 3500
      },
      "commercial_tiers": [
        {
          "tier_id": "individual_professional",
          "label": "Individual / Professional",
          "buyer_classes": [
            "C0",
            "C1"
          ],
          "eligible_buyer_classes": [
            "C0",
            "C1"
          ],
          "available": true,
          "reference_amount_zar": 750,
          "pricing_truth": "GOVERNED_REFERENCE_POINT",
          "market_validation": "UNPROVED",
          "quote_issue_authority": false,
          "invoice_issue_authority": false,
          "band_mutation_authority": false,
          "external_effects": false
        },
        {
          "tier_id": "team_department",
          "label": "Team / Department",
          "buyer_classes": [
            "C2",
            "C3"
          ],
          "eligible_buyer_classes": [
            "C2",
            "C3"
          ],
          "available": true,
          "reference_amount_zar": 2100,
          "pricing_truth": "GOVERNED_REFERENCE_POINT",
          "market_validation": "UNPROVED",
          "quote_issue_authority": false,
          "invoice_issue_authority": false,
          "band_mutation_authority": false,
          "external_effects": false
        },
        {
          "tier_id": "enterprise_programme",
          "label": "Enterprise / Programme",
          "buyer_classes": [
            "C4",
            "C5"
          ],
          "eligible_buyer_classes": [
            "C4"
          ],
          "available": true,
          "reference_amount_zar": 3500,
          "pricing_truth": "GOVERNED_REFERENCE_POINT",
          "market_validation": "UNPROVED",
          "quote_issue_authority": false,
          "invoice_issue_authority": false,
          "band_mutation_authority": false,
          "external_effects": false
        }
      ],
      "pricing_state": "HYPOTHESIS",
      "commercial_validation": "UNPROVED",
      "customers_will_pay": "UNPROVED",
      "authority_created": false,
      "external_effects": false
    },
    {
      "slug": "controldrift",
      "product_id": "controldrift",
      "name": "ControlDrift",
      "buyer_classes": [
        "C2",
        "C3",
        "C4",
        "C5"
      ],
      "pricing_model": "subscription",
      "primary_scope_unit": "control_monitoring_cycle",
      "governed_reference_band_zar": {
        "min": 5000,
        "max": 30000
      },
      "commercial_tiers": [
        {
          "tier_id": "individual_professional",
          "label": "Individual / Professional",
          "buyer_classes": [
            "C0",
            "C1"
          ],
          "eligible_buyer_classes": [],
          "available": false,
          "reference_amount_zar": null,
          "pricing_truth": "GOVERNED_REFERENCE_POINT",
          "market_validation": "UNPROVED",
          "quote_issue_authority": false,
          "invoice_issue_authority": false,
          "band_mutation_authority": false,
          "external_effects": false
        },
        {
          "tier_id": "team_department",
          "label": "Team / Department",
          "buyer_classes": [
            "C2",
            "C3"
          ],
          "eligible_buyer_classes": [
            "C2",
            "C3"
          ],
          "available": true,
          "reference_amount_zar": 17500,
          "pricing_truth": "GOVERNED_REFERENCE_POINT",
          "market_validation": "UNPROVED",
          "quote_issue_authority": false,
          "invoice_issue_authority": false,
          "band_mutation_authority": false,
          "external_effects": false
        },
        {
          "tier_id": "enterprise_programme",
          "label": "Enterprise / Programme",
          "buyer_classes": [
            "C4",
            "C5"
          ],
          "eligible_buyer_classes": [
            "C4",
            "C5"
          ],
          "available": true,
          "reference_amount_zar": 30000,
          "pricing_truth": "GOVERNED_REFERENCE_POINT",
          "market_validation": "UNPROVED",
          "quote_issue_authority": false,
          "invoice_issue_authority": false,
          "band_mutation_authority": false,
          "external_effects": false
        }
      ],
      "pricing_state": "HYPOTHESIS",
      "commercial_validation": "UNPROVED",
      "customers_will_pay": "UNPROVED",
      "authority_created": false,
      "external_effects": false
    },
    {
      "slug": "corporate-readiness",
      "product_id": "corporate_readiness",
      "name": "Corporate Readiness",
      "buyer_classes": [
        "C1",
        "C2",
        "C3",
        "C4"
      ],
      "pricing_model": "readiness_pack",
      "primary_scope_unit": "readiness_requirement",
      "governed_reference_band_zar": {
        "min": 1500,
        "max": 7500
      },
      "commercial_tiers": [
        {
          "tier_id": "individual_professional",
          "label": "Individual / Professional",
          "buyer_classes": [
            "C0",
            "C1"
          ],
          "eligible_buyer_classes": [
            "C1"
          ],
          "available": true,
          "reference_amount_zar": 1500,
          "pricing_truth": "GOVERNED_REFERENCE_POINT",
          "market_validation": "UNPROVED",
          "quote_issue_authority": false,
          "invoice_issue_authority": false,
          "band_mutation_authority": false,
          "external_effects": false
        },
        {
          "tier_id": "team_department",
          "label": "Team / Department",
          "buyer_classes": [
            "C2",
            "C3"
          ],
          "eligible_buyer_classes": [
            "C2",
            "C3"
          ],
          "available": true,
          "reference_amount_zar": 4500,
          "pricing_truth": "GOVERNED_REFERENCE_POINT",
          "market_validation": "UNPROVED",
          "quote_issue_authority": false,
          "invoice_issue_authority": false,
          "band_mutation_authority": false,
          "external_effects": false
        },
        {
          "tier_id": "enterprise_programme",
          "label": "Enterprise / Programme",
          "buyer_classes": [
            "C4",
            "C5"
          ],
          "eligible_buyer_classes": [
            "C4"
          ],
          "available": true,
          "reference_amount_zar": 7500,
          "pricing_truth": "GOVERNED_REFERENCE_POINT",
          "market_validation": "UNPROVED",
          "quote_issue_authority": false,
          "invoice_issue_authority": false,
          "band_mutation_authority": false,
          "external_effects": false
        }
      ],
      "pricing_state": "HYPOTHESIS",
      "commercial_validation": "UNPROVED",
      "customers_will_pay": "UNPROVED",
      "authority_created": false,
      "external_effects": false
    },
    {
      "slug": "cpdproof",
      "product_id": "cpdproof",
      "name": "CPDProof",
      "buyer_classes": [
        "C0",
        "C1",
        "C2",
        "C3",
        "C4"
      ],
      "pricing_model": "evidence_pack",
      "primary_scope_unit": "cpd_record",
      "governed_reference_band_zar": {
        "min": 350,
        "max": 1800
      },
      "commercial_tiers": [
        {
          "tier_id": "individual_professional",
          "label": "Individual / Professional",
          "buyer_classes": [
            "C0",
            "C1"
          ],
          "eligible_buyer_classes": [
            "C0",
            "C1"
          ],
          "available": true,
          "reference_amount_zar": 350,
          "pricing_truth": "GOVERNED_REFERENCE_POINT",
          "market_validation": "UNPROVED",
          "quote_issue_authority": false,
          "invoice_issue_authority": false,
          "band_mutation_authority": false,
          "external_effects": false
        },
        {
          "tier_id": "team_department",
          "label": "Team / Department",
          "buyer_classes": [
            "C2",
            "C3"
          ],
          "eligible_buyer_classes": [
            "C2",
            "C3"
          ],
          "available": true,
          "reference_amount_zar": 1100,
          "pricing_truth": "GOVERNED_REFERENCE_POINT",
          "market_validation": "UNPROVED",
          "quote_issue_authority": false,
          "invoice_issue_authority": false,
          "band_mutation_authority": false,
          "external_effects": false
        },
        {
          "tier_id": "enterprise_programme",
          "label": "Enterprise / Programme",
          "buyer_classes": [
            "C4",
            "C5"
          ],
          "eligible_buyer_classes": [
            "C4"
          ],
          "available": true,
          "reference_amount_zar": 1800,
          "pricing_truth": "GOVERNED_REFERENCE_POINT",
          "market_validation": "UNPROVED",
          "quote_issue_authority": false,
          "invoice_issue_authority": false,
          "band_mutation_authority": false,
          "external_effects": false
        }
      ],
      "pricing_state": "HYPOTHESIS",
      "commercial_validation": "UNPROVED",
      "customers_will_pay": "UNPROVED",
      "authority_created": false,
      "external_effects": false
    },
    {
      "slug": "criticalai-assurance",
      "product_id": "criticalai_assurance",
      "name": "CriticalAI Assurance",
      "buyer_classes": [
        "C3",
        "C4",
        "C5"
      ],
      "pricing_model": "assurance_programme",
      "primary_scope_unit": "critical_ai_system",
      "governed_reference_band_zar": {
        "min": 15000,
        "max": 100000
      },
      "commercial_tiers": [
        {
          "tier_id": "individual_professional",
          "label": "Individual / Professional",
          "buyer_classes": [
            "C0",
            "C1"
          ],
          "eligible_buyer_classes": [],
          "available": false,
          "reference_amount_zar": null,
          "pricing_truth": "GOVERNED_REFERENCE_POINT",
          "market_validation": "UNPROVED",
          "quote_issue_authority": false,
          "invoice_issue_authority": false,
          "band_mutation_authority": false,
          "external_effects": false
        },
        {
          "tier_id": "team_department",
          "label": "Team / Department",
          "buyer_classes": [
            "C2",
            "C3"
          ],
          "eligible_buyer_classes": [
            "C3"
          ],
          "available": true,
          "reference_amount_zar": 57500,
          "pricing_truth": "GOVERNED_REFERENCE_POINT",
          "market_validation": "UNPROVED",
          "quote_issue_authority": false,
          "invoice_issue_authority": false,
          "band_mutation_authority": false,
          "external_effects": false
        },
        {
          "tier_id": "enterprise_programme",
          "label": "Enterprise / Programme",
          "buyer_classes": [
            "C4",
            "C5"
          ],
          "eligible_buyer_classes": [
            "C4",
            "C5"
          ],
          "available": true,
          "reference_amount_zar": 100000,
          "pricing_truth": "GOVERNED_REFERENCE_POINT",
          "market_validation": "UNPROVED",
          "quote_issue_authority": false,
          "invoice_issue_authority": false,
          "band_mutation_authority": false,
          "external_effects": false
        }
      ],
      "pricing_state": "HYPOTHESIS",
      "commercial_validation": "UNPROVED",
      "customers_will_pay": "UNPROVED",
      "authority_created": false,
      "external_effects": false
    },
    {
      "slug": "cyberassurance",
      "product_id": "cyberassurance",
      "name": "CyberAssurance",
      "buyer_classes": [
        "C2",
        "C3",
        "C4",
        "C5"
      ],
      "pricing_model": "assurance_programme",
      "primary_scope_unit": "cyber_control",
      "governed_reference_band_zar": {
        "min": 7500,
        "max": 50000
      },
      "commercial_tiers": [
        {
          "tier_id": "individual_professional",
          "label": "Individual / Professional",
          "buyer_classes": [
            "C0",
            "C1"
          ],
          "eligible_buyer_classes": [],
          "available": false,
          "reference_amount_zar": null,
          "pricing_truth": "GOVERNED_REFERENCE_POINT",
          "market_validation": "UNPROVED",
          "quote_issue_authority": false,
          "invoice_issue_authority": false,
          "band_mutation_authority": false,
          "external_effects": false
        },
        {
          "tier_id": "team_department",
          "label": "Team / Department",
          "buyer_classes": [
            "C2",
            "C3"
          ],
          "eligible_buyer_classes": [
            "C2",
            "C3"
          ],
          "available": true,
          "reference_amount_zar": 28750,
          "pricing_truth": "GOVERNED_REFERENCE_POINT",
          "market_validation": "UNPROVED",
          "quote_issue_authority": false,
          "invoice_issue_authority": false,
          "band_mutation_authority": false,
          "external_effects": false
        },
        {
          "tier_id": "enterprise_programme",
          "label": "Enterprise / Programme",
          "buyer_classes": [
            "C4",
            "C5"
          ],
          "eligible_buyer_classes": [
            "C4",
            "C5"
          ],
          "available": true,
          "reference_amount_zar": 50000,
          "pricing_truth": "GOVERNED_REFERENCE_POINT",
          "market_validation": "UNPROVED",
          "quote_issue_authority": false,
          "invoice_issue_authority": false,
          "band_mutation_authority": false,
          "external_effects": false
        }
      ],
      "pricing_state": "HYPOTHESIS",
      "commercial_validation": "UNPROVED",
      "customers_will_pay": "UNPROVED",
      "authority_created": false,
      "external_effects": false
    },
    {
      "slug": "diligenceroom",
      "product_id": "diligenceroom",
      "name": "DiligenceRoom",
      "buyer_classes": [
        "C2",
        "C3",
        "C4",
        "C5"
      ],
      "pricing_model": "setup_plus_volume",
      "primary_scope_unit": "diligence_document",
      "governed_reference_band_zar": {
        "min": 5000,
        "max": 30000
      },
      "commercial_tiers": [
        {
          "tier_id": "individual_professional",
          "label": "Individual / Professional",
          "buyer_classes": [
            "C0",
            "C1"
          ],
          "eligible_buyer_classes": [],
          "available": false,
          "reference_amount_zar": null,
          "pricing_truth": "GOVERNED_REFERENCE_POINT",
          "market_validation": "UNPROVED",
          "quote_issue_authority": false,
          "invoice_issue_authority": false,
          "band_mutation_authority": false,
          "external_effects": false
        },
        {
          "tier_id": "team_department",
          "label": "Team / Department",
          "buyer_classes": [
            "C2",
            "C3"
          ],
          "eligible_buyer_classes": [
            "C2",
            "C3"
          ],
          "available": true,
          "reference_amount_zar": 17500,
          "pricing_truth": "GOVERNED_REFERENCE_POINT",
          "market_validation": "UNPROVED",
          "quote_issue_authority": false,
          "invoice_issue_authority": false,
          "band_mutation_authority": false,
          "external_effects": false
        },
        {
          "tier_id": "enterprise_programme",
          "label": "Enterprise / Programme",
          "buyer_classes": [
            "C4",
            "C5"
          ],
          "eligible_buyer_classes": [
            "C4",
            "C5"
          ],
          "available": true,
          "reference_amount_zar": 30000,
          "pricing_truth": "GOVERNED_REFERENCE_POINT",
          "market_validation": "UNPROVED",
          "quote_issue_authority": false,
          "invoice_issue_authority": false,
          "band_mutation_authority": false,
          "external_effects": false
        }
      ],
      "pricing_state": "HYPOTHESIS",
      "commercial_validation": "UNPROVED",
      "customers_will_pay": "UNPROVED",
      "authority_created": false,
      "external_effects": false
    },
    {
      "slug": "dio-ai-assurance",
      "product_id": "dio_ai_assurance",
      "name": "DIO AI Assurance",
      "buyer_classes": [
        "C2",
        "C3",
        "C4",
        "C5"
      ],
      "pricing_model": "assurance_programme",
      "primary_scope_unit": "ai_system",
      "governed_reference_band_zar": {
        "min": 7500,
        "max": 40000
      },
      "commercial_tiers": [
        {
          "tier_id": "individual_professional",
          "label": "Individual / Professional",
          "buyer_classes": [
            "C0",
            "C1"
          ],
          "eligible_buyer_classes": [],
          "available": false,
          "reference_amount_zar": null,
          "pricing_truth": "GOVERNED_REFERENCE_POINT",
          "market_validation": "UNPROVED",
          "quote_issue_authority": false,
          "invoice_issue_authority": false,
          "band_mutation_authority": false,
          "external_effects": false
        },
        {
          "tier_id": "team_department",
          "label": "Team / Department",
          "buyer_classes": [
            "C2",
            "C3"
          ],
          "eligible_buyer_classes": [
            "C2",
            "C3"
          ],
          "available": true,
          "reference_amount_zar": 23750,
          "pricing_truth": "GOVERNED_REFERENCE_POINT",
          "market_validation": "UNPROVED",
          "quote_issue_authority": false,
          "invoice_issue_authority": false,
          "band_mutation_authority": false,
          "external_effects": false
        },
        {
          "tier_id": "enterprise_programme",
          "label": "Enterprise / Programme",
          "buyer_classes": [
            "C4",
            "C5"
          ],
          "eligible_buyer_classes": [
            "C4",
            "C5"
          ],
          "available": true,
          "reference_amount_zar": 40000,
          "pricing_truth": "GOVERNED_REFERENCE_POINT",
          "market_validation": "UNPROVED",
          "quote_issue_authority": false,
          "invoice_issue_authority": false,
          "band_mutation_authority": false,
          "external_effects": false
        }
      ],
      "pricing_state": "HYPOTHESIS",
      "commercial_validation": "UNPROVED",
      "customers_will_pay": "UNPROVED",
      "authority_created": false,
      "external_effects": false
    },
    {
      "slug": "dio-regops",
      "product_id": "dio_regops",
      "name": "DIO RegOps",
      "buyer_classes": [
        "C2",
        "C3",
        "C4",
        "C5"
      ],
      "pricing_model": "regops_programme",
      "primary_scope_unit": "regulatory_obligation",
      "governed_reference_band_zar": {
        "min": 10000,
        "max": 75000
      },
      "commercial_tiers": [
        {
          "tier_id": "individual_professional",
          "label": "Individual / Professional",
          "buyer_classes": [
            "C0",
            "C1"
          ],
          "eligible_buyer_classes": [],
          "available": false,
          "reference_amount_zar": null,
          "pricing_truth": "GOVERNED_REFERENCE_POINT",
          "market_validation": "UNPROVED",
          "quote_issue_authority": false,
          "invoice_issue_authority": false,
          "band_mutation_authority": false,
          "external_effects": false
        },
        {
          "tier_id": "team_department",
          "label": "Team / Department",
          "buyer_classes": [
            "C2",
            "C3"
          ],
          "eligible_buyer_classes": [
            "C2",
            "C3"
          ],
          "available": true,
          "reference_amount_zar": 42500,
          "pricing_truth": "GOVERNED_REFERENCE_POINT",
          "market_validation": "UNPROVED",
          "quote_issue_authority": false,
          "invoice_issue_authority": false,
          "band_mutation_authority": false,
          "external_effects": false
        },
        {
          "tier_id": "enterprise_programme",
          "label": "Enterprise / Programme",
          "buyer_classes": [
            "C4",
            "C5"
          ],
          "eligible_buyer_classes": [
            "C4",
            "C5"
          ],
          "available": true,
          "reference_amount_zar": 75000,
          "pricing_truth": "GOVERNED_REFERENCE_POINT",
          "market_validation": "UNPROVED",
          "quote_issue_authority": false,
          "invoice_issue_authority": false,
          "band_mutation_authority": false,
          "external_effects": false
        }
      ],
      "pricing_state": "HYPOTHESIS",
      "commercial_validation": "UNPROVED",
      "customers_will_pay": "UNPROVED",
      "authority_created": false,
      "external_effects": false
    },
    {
      "slug": "document-studio-edit",
      "product_id": "document_studio_edit",
      "name": "Document Studio Edit",
      "buyer_classes": [
        "C0",
        "C1",
        "C2",
        "C3"
      ],
      "pricing_model": "per_document",
      "primary_scope_unit": "page",
      "governed_reference_band_zar": {
        "min": 150,
        "max": 1200
      },
      "commercial_tiers": [
        {
          "tier_id": "individual_professional",
          "label": "Individual / Professional",
          "buyer_classes": [
            "C0",
            "C1"
          ],
          "eligible_buyer_classes": [
            "C0",
            "C1"
          ],
          "available": true,
          "reference_amount_zar": 150,
          "pricing_truth": "GOVERNED_REFERENCE_POINT",
          "market_validation": "UNPROVED",
          "quote_issue_authority": false,
          "invoice_issue_authority": false,
          "band_mutation_authority": false,
          "external_effects": false
        },
        {
          "tier_id": "team_department",
          "label": "Team / Department",
          "buyer_classes": [
            "C2",
            "C3"
          ],
          "eligible_buyer_classes": [
            "C2",
            "C3"
          ],
          "available": true,
          "reference_amount_zar": 700,
          "pricing_truth": "GOVERNED_REFERENCE_POINT",
          "market_validation": "UNPROVED",
          "quote_issue_authority": false,
          "invoice_issue_authority": false,
          "band_mutation_authority": false,
          "external_effects": false
        },
        {
          "tier_id": "enterprise_programme",
          "label": "Enterprise / Programme",
          "buyer_classes": [
            "C4",
            "C5"
          ],
          "eligible_buyer_classes": [],
          "available": false,
          "reference_amount_zar": null,
          "pricing_truth": "GOVERNED_REFERENCE_POINT",
          "market_validation": "UNPROVED",
          "quote_issue_authority": false,
          "invoice_issue_authority": false,
          "band_mutation_authority": false,
          "external_effects": false
        }
      ],
      "pricing_state": "HYPOTHESIS",
      "commercial_validation": "UNPROVED",
      "customers_will_pay": "UNPROVED",
      "authority_created": false,
      "external_effects": false
    },
    {
      "slug": "document-studio-localize",
      "product_id": "document_studio_localize",
      "name": "Document Studio Localize",
      "buyer_classes": [
        "C0",
        "C1",
        "C2",
        "C3",
        "C4"
      ],
      "pricing_model": "usage",
      "primary_scope_unit": "word",
      "governed_reference_band_zar": {
        "min": 350,
        "max": 2500
      },
      "commercial_tiers": [
        {
          "tier_id": "individual_professional",
          "label": "Individual / Professional",
          "buyer_classes": [
            "C0",
            "C1"
          ],
          "eligible_buyer_classes": [
            "C0",
            "C1"
          ],
          "available": true,
          "reference_amount_zar": 350,
          "pricing_truth": "GOVERNED_REFERENCE_POINT",
          "market_validation": "UNPROVED",
          "quote_issue_authority": false,
          "invoice_issue_authority": false,
          "band_mutation_authority": false,
          "external_effects": false
        },
        {
          "tier_id": "team_department",
          "label": "Team / Department",
          "buyer_classes": [
            "C2",
            "C3"
          ],
          "eligible_buyer_classes": [
            "C2",
            "C3"
          ],
          "available": true,
          "reference_amount_zar": 1400,
          "pricing_truth": "GOVERNED_REFERENCE_POINT",
          "market_validation": "UNPROVED",
          "quote_issue_authority": false,
          "invoice_issue_authority": false,
          "band_mutation_authority": false,
          "external_effects": false
        },
        {
          "tier_id": "enterprise_programme",
          "label": "Enterprise / Programme",
          "buyer_classes": [
            "C4",
            "C5"
          ],
          "eligible_buyer_classes": [
            "C4"
          ],
          "available": true,
          "reference_amount_zar": 2500,
          "pricing_truth": "GOVERNED_REFERENCE_POINT",
          "market_validation": "UNPROVED",
          "quote_issue_authority": false,
          "invoice_issue_authority": false,
          "band_mutation_authority": false,
          "external_effects": false
        }
      ],
      "pricing_state": "HYPOTHESIS",
      "commercial_validation": "UNPROVED",
      "customers_will_pay": "UNPROVED",
      "authority_created": false,
      "external_effects": false
    },
    {
      "slug": "document-studio-publish",
      "product_id": "document_studio_publish",
      "name": "Document Studio Publish",
      "buyer_classes": [
        "C0",
        "C1",
        "C2",
        "C3",
        "C4"
      ],
      "pricing_model": "package",
      "primary_scope_unit": "output_document",
      "governed_reference_band_zar": {
        "min": 250,
        "max": 1800
      },
      "commercial_tiers": [
        {
          "tier_id": "individual_professional",
          "label": "Individual / Professional",
          "buyer_classes": [
            "C0",
            "C1"
          ],
          "eligible_buyer_classes": [
            "C0",
            "C1"
          ],
          "available": true,
          "reference_amount_zar": 250,
          "pricing_truth": "GOVERNED_REFERENCE_POINT",
          "market_validation": "UNPROVED",
          "quote_issue_authority": false,
          "invoice_issue_authority": false,
          "band_mutation_authority": false,
          "external_effects": false
        },
        {
          "tier_id": "team_department",
          "label": "Team / Department",
          "buyer_classes": [
            "C2",
            "C3"
          ],
          "eligible_buyer_classes": [
            "C2",
            "C3"
          ],
          "available": true,
          "reference_amount_zar": 1000,
          "pricing_truth": "GOVERNED_REFERENCE_POINT",
          "market_validation": "UNPROVED",
          "quote_issue_authority": false,
          "invoice_issue_authority": false,
          "band_mutation_authority": false,
          "external_effects": false
        },
        {
          "tier_id": "enterprise_programme",
          "label": "Enterprise / Programme",
          "buyer_classes": [
            "C4",
            "C5"
          ],
          "eligible_buyer_classes": [
            "C4"
          ],
          "available": true,
          "reference_amount_zar": 1800,
          "pricing_truth": "GOVERNED_REFERENCE_POINT",
          "market_validation": "UNPROVED",
          "quote_issue_authority": false,
          "invoice_issue_authority": false,
          "band_mutation_authority": false,
          "external_effects": false
        }
      ],
      "pricing_state": "HYPOTHESIS",
      "commercial_validation": "UNPROVED",
      "customers_will_pay": "UNPROVED",
      "authority_created": false,
      "external_effects": false
    },
    {
      "slug": "donorproof",
      "product_id": "donorproof",
      "name": "DonorProof",
      "buyer_classes": [
        "C1",
        "C2",
        "C3",
        "C4",
        "C5"
      ],
      "pricing_model": "setup_plus_volume",
      "primary_scope_unit": "donor_evidence_item",
      "governed_reference_band_zar": {
        "min": 1500,
        "max": 7500
      },
      "commercial_tiers": [
        {
          "tier_id": "individual_professional",
          "label": "Individual / Professional",
          "buyer_classes": [
            "C0",
            "C1"
          ],
          "eligible_buyer_classes": [
            "C1"
          ],
          "available": true,
          "reference_amount_zar": 1500,
          "pricing_truth": "GOVERNED_REFERENCE_POINT",
          "market_validation": "UNPROVED",
          "quote_issue_authority": false,
          "invoice_issue_authority": false,
          "band_mutation_authority": false,
          "external_effects": false
        },
        {
          "tier_id": "team_department",
          "label": "Team / Department",
          "buyer_classes": [
            "C2",
            "C3"
          ],
          "eligible_buyer_classes": [
            "C2",
            "C3"
          ],
          "available": true,
          "reference_amount_zar": 4500,
          "pricing_truth": "GOVERNED_REFERENCE_POINT",
          "market_validation": "UNPROVED",
          "quote_issue_authority": false,
          "invoice_issue_authority": false,
          "band_mutation_authority": false,
          "external_effects": false
        },
        {
          "tier_id": "enterprise_programme",
          "label": "Enterprise / Programme",
          "buyer_classes": [
            "C4",
            "C5"
          ],
          "eligible_buyer_classes": [
            "C4",
            "C5"
          ],
          "available": true,
          "reference_amount_zar": 7500,
          "pricing_truth": "GOVERNED_REFERENCE_POINT",
          "market_validation": "UNPROVED",
          "quote_issue_authority": false,
          "invoice_issue_authority": false,
          "band_mutation_authority": false,
          "external_effects": false
        }
      ],
      "pricing_state": "HYPOTHESIS",
      "commercial_validation": "UNPROVED",
      "customers_will_pay": "UNPROVED",
      "authority_created": false,
      "external_effects": false
    },
    {
      "slug": "dora-vendor-assurance",
      "product_id": "dora_vendor_assurance",
      "name": "DORA Vendor Assurance",
      "buyer_classes": [
        "C3",
        "C4",
        "C5"
      ],
      "pricing_model": "assurance_programme",
      "primary_scope_unit": "regulated_vendor",
      "governed_reference_band_zar": {
        "min": 15000,
        "max": 100000
      },
      "commercial_tiers": [
        {
          "tier_id": "individual_professional",
          "label": "Individual / Professional",
          "buyer_classes": [
            "C0",
            "C1"
          ],
          "eligible_buyer_classes": [],
          "available": false,
          "reference_amount_zar": null,
          "pricing_truth": "GOVERNED_REFERENCE_POINT",
          "market_validation": "UNPROVED",
          "quote_issue_authority": false,
          "invoice_issue_authority": false,
          "band_mutation_authority": false,
          "external_effects": false
        },
        {
          "tier_id": "team_department",
          "label": "Team / Department",
          "buyer_classes": [
            "C2",
            "C3"
          ],
          "eligible_buyer_classes": [
            "C3"
          ],
          "available": true,
          "reference_amount_zar": 57500,
          "pricing_truth": "GOVERNED_REFERENCE_POINT",
          "market_validation": "UNPROVED",
          "quote_issue_authority": false,
          "invoice_issue_authority": false,
          "band_mutation_authority": false,
          "external_effects": false
        },
        {
          "tier_id": "enterprise_programme",
          "label": "Enterprise / Programme",
          "buyer_classes": [
            "C4",
            "C5"
          ],
          "eligible_buyer_classes": [
            "C4",
            "C5"
          ],
          "available": true,
          "reference_amount_zar": 100000,
          "pricing_truth": "GOVERNED_REFERENCE_POINT",
          "market_validation": "UNPROVED",
          "quote_issue_authority": false,
          "invoice_issue_authority": false,
          "band_mutation_authority": false,
          "external_effects": false
        }
      ],
      "pricing_state": "HYPOTHESIS",
      "commercial_validation": "UNPROVED",
      "customers_will_pay": "UNPROVED",
      "authority_created": false,
      "external_effects": false
    },
    {
      "slug": "dossierops",
      "product_id": "dossierops",
      "name": "DossierOps",
      "buyer_classes": [
        "C1",
        "C2",
        "C3",
        "C4"
      ],
      "pricing_model": "package",
      "primary_scope_unit": "dossier_item",
      "governed_reference_band_zar": {
        "min": 1000,
        "max": 5000
      },
      "commercial_tiers": [
        {
          "tier_id": "individual_professional",
          "label": "Individual / Professional",
          "buyer_classes": [
            "C0",
            "C1"
          ],
          "eligible_buyer_classes": [
            "C1"
          ],
          "available": true,
          "reference_amount_zar": 1000,
          "pricing_truth": "GOVERNED_REFERENCE_POINT",
          "market_validation": "UNPROVED",
          "quote_issue_authority": false,
          "invoice_issue_authority": false,
          "band_mutation_authority": false,
          "external_effects": false
        },
        {
          "tier_id": "team_department",
          "label": "Team / Department",
          "buyer_classes": [
            "C2",
            "C3"
          ],
          "eligible_buyer_classes": [
            "C2",
            "C3"
          ],
          "available": true,
          "reference_amount_zar": 3000,
          "pricing_truth": "GOVERNED_REFERENCE_POINT",
          "market_validation": "UNPROVED",
          "quote_issue_authority": false,
          "invoice_issue_authority": false,
          "band_mutation_authority": false,
          "external_effects": false
        },
        {
          "tier_id": "enterprise_programme",
          "label": "Enterprise / Programme",
          "buyer_classes": [
            "C4",
            "C5"
          ],
          "eligible_buyer_classes": [
            "C4"
          ],
          "available": true,
          "reference_amount_zar": 5000,
          "pricing_truth": "GOVERNED_REFERENCE_POINT",
          "market_validation": "UNPROVED",
          "quote_issue_authority": false,
          "invoice_issue_authority": false,
          "band_mutation_authority": false,
          "external_effects": false
        }
      ],
      "pricing_state": "HYPOTHESIS",
      "commercial_validation": "UNPROVED",
      "customers_will_pay": "UNPROVED",
      "authority_created": false,
      "external_effects": false
    },
    {
      "slug": "entrepreneurproof",
      "product_id": "entrepreneurproof",
      "name": "EntrepreneurProof",
      "buyer_classes": [
        "C0",
        "C1",
        "C2",
        "C3"
      ],
      "pricing_model": "readiness_pack",
      "primary_scope_unit": "venture_claim",
      "governed_reference_band_zar": {
        "min": 500,
        "max": 2500
      },
      "commercial_tiers": [
        {
          "tier_id": "individual_professional",
          "label": "Individual / Professional",
          "buyer_classes": [
            "C0",
            "C1"
          ],
          "eligible_buyer_classes": [
            "C0",
            "C1"
          ],
          "available": true,
          "reference_amount_zar": 500,
          "pricing_truth": "GOVERNED_REFERENCE_POINT",
          "market_validation": "UNPROVED",
          "quote_issue_authority": false,
          "invoice_issue_authority": false,
          "band_mutation_authority": false,
          "external_effects": false
        },
        {
          "tier_id": "team_department",
          "label": "Team / Department",
          "buyer_classes": [
            "C2",
            "C3"
          ],
          "eligible_buyer_classes": [
            "C2",
            "C3"
          ],
          "available": true,
          "reference_amount_zar": 1500,
          "pricing_truth": "GOVERNED_REFERENCE_POINT",
          "market_validation": "UNPROVED",
          "quote_issue_authority": false,
          "invoice_issue_authority": false,
          "band_mutation_authority": false,
          "external_effects": false
        },
        {
          "tier_id": "enterprise_programme",
          "label": "Enterprise / Programme",
          "buyer_classes": [
            "C4",
            "C5"
          ],
          "eligible_buyer_classes": [],
          "available": false,
          "reference_amount_zar": null,
          "pricing_truth": "GOVERNED_REFERENCE_POINT",
          "market_validation": "UNPROVED",
          "quote_issue_authority": false,
          "invoice_issue_authority": false,
          "band_mutation_authority": false,
          "external_effects": false
        }
      ],
      "pricing_state": "HYPOTHESIS",
      "commercial_validation": "UNPROVED",
      "customers_will_pay": "UNPROVED",
      "authority_created": false,
      "external_effects": false
    },
    {
      "slug": "evidex-evidenceops",
      "product_id": "evidex_evidenceops",
      "name": "Evidex EvidenceOps",
      "buyer_classes": [
        "C0",
        "C1",
        "C2",
        "C3",
        "C4",
        "C5"
      ],
      "pricing_model": "setup_plus_volume",
      "primary_scope_unit": "evidence_item",
      "governed_reference_band_zar": {
        "min": 350,
        "max": 5000
      },
      "commercial_tiers": [
        {
          "tier_id": "individual_professional",
          "label": "Individual / Professional",
          "buyer_classes": [
            "C0",
            "C1"
          ],
          "eligible_buyer_classes": [
            "C0",
            "C1"
          ],
          "available": true,
          "reference_amount_zar": 350,
          "pricing_truth": "GOVERNED_REFERENCE_POINT",
          "market_validation": "UNPROVED",
          "quote_issue_authority": false,
          "invoice_issue_authority": false,
          "band_mutation_authority": false,
          "external_effects": false
        },
        {
          "tier_id": "team_department",
          "label": "Team / Department",
          "buyer_classes": [
            "C2",
            "C3"
          ],
          "eligible_buyer_classes": [
            "C2",
            "C3"
          ],
          "available": true,
          "reference_amount_zar": 2700,
          "pricing_truth": "GOVERNED_REFERENCE_POINT",
          "market_validation": "UNPROVED",
          "quote_issue_authority": false,
          "invoice_issue_authority": false,
          "band_mutation_authority": false,
          "external_effects": false
        },
        {
          "tier_id": "enterprise_programme",
          "label": "Enterprise / Programme",
          "buyer_classes": [
            "C4",
            "C5"
          ],
          "eligible_buyer_classes": [
            "C4",
            "C5"
          ],
          "available": true,
          "reference_amount_zar": 5000,
          "pricing_truth": "GOVERNED_REFERENCE_POINT",
          "market_validation": "UNPROVED",
          "quote_issue_authority": false,
          "invoice_issue_authority": false,
          "band_mutation_authority": false,
          "external_effects": false
        }
      ],
      "pricing_state": "HYPOTHESIS",
      "commercial_validation": "UNPROVED",
      "customers_will_pay": "UNPROVED",
      "authority_created": false,
      "external_effects": false
    },
    {
      "slug": "finance-readiness",
      "product_id": "finance_readiness",
      "name": "Finance Readiness",
      "buyer_classes": [
        "C0",
        "C1",
        "C2",
        "C3"
      ],
      "pricing_model": "readiness_pack",
      "primary_scope_unit": "finance_requirement",
      "governed_reference_band_zar": {
        "min": 750,
        "max": 3500
      },
      "commercial_tiers": [
        {
          "tier_id": "individual_professional",
          "label": "Individual / Professional",
          "buyer_classes": [
            "C0",
            "C1"
          ],
          "eligible_buyer_classes": [
            "C0",
            "C1"
          ],
          "available": true,
          "reference_amount_zar": 750,
          "pricing_truth": "GOVERNED_REFERENCE_POINT",
          "market_validation": "UNPROVED",
          "quote_issue_authority": false,
          "invoice_issue_authority": false,
          "band_mutation_authority": false,
          "external_effects": false
        },
        {
          "tier_id": "team_department",
          "label": "Team / Department",
          "buyer_classes": [
            "C2",
            "C3"
          ],
          "eligible_buyer_classes": [
            "C2",
            "C3"
          ],
          "available": true,
          "reference_amount_zar": 2100,
          "pricing_truth": "GOVERNED_REFERENCE_POINT",
          "market_validation": "UNPROVED",
          "quote_issue_authority": false,
          "invoice_issue_authority": false,
          "band_mutation_authority": false,
          "external_effects": false
        },
        {
          "tier_id": "enterprise_programme",
          "label": "Enterprise / Programme",
          "buyer_classes": [
            "C4",
            "C5"
          ],
          "eligible_buyer_classes": [],
          "available": false,
          "reference_amount_zar": null,
          "pricing_truth": "GOVERNED_REFERENCE_POINT",
          "market_validation": "UNPROVED",
          "quote_issue_authority": false,
          "invoice_issue_authority": false,
          "band_mutation_authority": false,
          "external_effects": false
        }
      ],
      "pricing_state": "HYPOTHESIS",
      "commercial_validation": "UNPROVED",
      "customers_will_pay": "UNPROVED",
      "authority_created": false,
      "external_effects": false
    },
    {
      "slug": "finance-readiness-studio",
      "product_id": "finance_readiness_studio",
      "name": "Finance Readiness Studio",
      "buyer_classes": [
        "C1",
        "C2",
        "C3",
        "C4"
      ],
      "pricing_model": "studio_project",
      "primary_scope_unit": "finance_pack",
      "governed_reference_band_zar": {
        "min": 1500,
        "max": 7500
      },
      "commercial_tiers": [
        {
          "tier_id": "individual_professional",
          "label": "Individual / Professional",
          "buyer_classes": [
            "C0",
            "C1"
          ],
          "eligible_buyer_classes": [
            "C1"
          ],
          "available": true,
          "reference_amount_zar": 1500,
          "pricing_truth": "GOVERNED_REFERENCE_POINT",
          "market_validation": "UNPROVED",
          "quote_issue_authority": false,
          "invoice_issue_authority": false,
          "band_mutation_authority": false,
          "external_effects": false
        },
        {
          "tier_id": "team_department",
          "label": "Team / Department",
          "buyer_classes": [
            "C2",
            "C3"
          ],
          "eligible_buyer_classes": [
            "C2",
            "C3"
          ],
          "available": true,
          "reference_amount_zar": 4500,
          "pricing_truth": "GOVERNED_REFERENCE_POINT",
          "market_validation": "UNPROVED",
          "quote_issue_authority": false,
          "invoice_issue_authority": false,
          "band_mutation_authority": false,
          "external_effects": false
        },
        {
          "tier_id": "enterprise_programme",
          "label": "Enterprise / Programme",
          "buyer_classes": [
            "C4",
            "C5"
          ],
          "eligible_buyer_classes": [
            "C4"
          ],
          "available": true,
          "reference_amount_zar": 7500,
          "pricing_truth": "GOVERNED_REFERENCE_POINT",
          "market_validation": "UNPROVED",
          "quote_issue_authority": false,
          "invoice_issue_authority": false,
          "band_mutation_authority": false,
          "external_effects": false
        }
      ],
      "pricing_state": "HYPOTHESIS",
      "commercial_validation": "UNPROVED",
      "customers_will_pay": "UNPROVED",
      "authority_created": false,
      "external_effects": false
    },
    {
      "slug": "fundingfinder",
      "product_id": "fundingfinder",
      "name": "FundingFinder",
      "buyer_classes": [
        "C0",
        "C1",
        "C2",
        "C3"
      ],
      "pricing_model": "research_pack",
      "primary_scope_unit": "funding_opportunity",
      "governed_reference_band_zar": {
        "min": 350,
        "max": 1800
      },
      "commercial_tiers": [
        {
          "tier_id": "individual_professional",
          "label": "Individual / Professional",
          "buyer_classes": [
            "C0",
            "C1"
          ],
          "eligible_buyer_classes": [
            "C0",
            "C1"
          ],
          "available": true,
          "reference_amount_zar": 350,
          "pricing_truth": "GOVERNED_REFERENCE_POINT",
          "market_validation": "UNPROVED",
          "quote_issue_authority": false,
          "invoice_issue_authority": false,
          "band_mutation_authority": false,
          "external_effects": false
        },
        {
          "tier_id": "team_department",
          "label": "Team / Department",
          "buyer_classes": [
            "C2",
            "C3"
          ],
          "eligible_buyer_classes": [
            "C2",
            "C3"
          ],
          "available": true,
          "reference_amount_zar": 1100,
          "pricing_truth": "GOVERNED_REFERENCE_POINT",
          "market_validation": "UNPROVED",
          "quote_issue_authority": false,
          "invoice_issue_authority": false,
          "band_mutation_authority": false,
          "external_effects": false
        },
        {
          "tier_id": "enterprise_programme",
          "label": "Enterprise / Programme",
          "buyer_classes": [
            "C4",
            "C5"
          ],
          "eligible_buyer_classes": [],
          "available": false,
          "reference_amount_zar": null,
          "pricing_truth": "GOVERNED_REFERENCE_POINT",
          "market_validation": "UNPROVED",
          "quote_issue_authority": false,
          "invoice_issue_authority": false,
          "band_mutation_authority": false,
          "external_effects": false
        }
      ],
      "pricing_state": "HYPOTHESIS",
      "commercial_validation": "UNPROVED",
      "customers_will_pay": "UNPROVED",
      "authority_created": false,
      "external_effects": false
    },
    {
      "slug": "grantproof",
      "product_id": "grantproof",
      "name": "GrantProof",
      "buyer_classes": [
        "C0",
        "C1",
        "C2",
        "C3",
        "C4"
      ],
      "pricing_model": "package",
      "primary_scope_unit": "grant_requirement",
      "governed_reference_band_zar": {
        "min": 900,
        "max": 4500
      },
      "commercial_tiers": [
        {
          "tier_id": "individual_professional",
          "label": "Individual / Professional",
          "buyer_classes": [
            "C0",
            "C1"
          ],
          "eligible_buyer_classes": [
            "C0",
            "C1"
          ],
          "available": true,
          "reference_amount_zar": 900,
          "pricing_truth": "GOVERNED_REFERENCE_POINT",
          "market_validation": "UNPROVED",
          "quote_issue_authority": false,
          "invoice_issue_authority": false,
          "band_mutation_authority": false,
          "external_effects": false
        },
        {
          "tier_id": "team_department",
          "label": "Team / Department",
          "buyer_classes": [
            "C2",
            "C3"
          ],
          "eligible_buyer_classes": [
            "C2",
            "C3"
          ],
          "available": true,
          "reference_amount_zar": 2700,
          "pricing_truth": "GOVERNED_REFERENCE_POINT",
          "market_validation": "UNPROVED",
          "quote_issue_authority": false,
          "invoice_issue_authority": false,
          "band_mutation_authority": false,
          "external_effects": false
        },
        {
          "tier_id": "enterprise_programme",
          "label": "Enterprise / Programme",
          "buyer_classes": [
            "C4",
            "C5"
          ],
          "eligible_buyer_classes": [
            "C4"
          ],
          "available": true,
          "reference_amount_zar": 4500,
          "pricing_truth": "GOVERNED_REFERENCE_POINT",
          "market_validation": "UNPROVED",
          "quote_issue_authority": false,
          "invoice_issue_authority": false,
          "band_mutation_authority": false,
          "external_effects": false
        }
      ],
      "pricing_state": "HYPOTHESIS",
      "commercial_validation": "UNPROVED",
      "customers_will_pay": "UNPROVED",
      "authority_created": false,
      "external_effects": false
    },
    {
      "slug": "homs-accreditation",
      "product_id": "homs_accreditation",
      "name": "HOMS Accreditation",
      "buyer_classes": [
        "C2",
        "C3",
        "C4",
        "C5"
      ],
      "pricing_model": "setup_plus_volume",
      "primary_scope_unit": "accreditation_requirement",
      "governed_reference_band_zar": {
        "min": 5000,
        "max": 30000
      },
      "commercial_tiers": [
        {
          "tier_id": "individual_professional",
          "label": "Individual / Professional",
          "buyer_classes": [
            "C0",
            "C1"
          ],
          "eligible_buyer_classes": [],
          "available": false,
          "reference_amount_zar": null,
          "pricing_truth": "GOVERNED_REFERENCE_POINT",
          "market_validation": "UNPROVED",
          "quote_issue_authority": false,
          "invoice_issue_authority": false,
          "band_mutation_authority": false,
          "external_effects": false
        },
        {
          "tier_id": "team_department",
          "label": "Team / Department",
          "buyer_classes": [
            "C2",
            "C3"
          ],
          "eligible_buyer_classes": [
            "C2",
            "C3"
          ],
          "available": true,
          "reference_amount_zar": 17500,
          "pricing_truth": "GOVERNED_REFERENCE_POINT",
          "market_validation": "UNPROVED",
          "quote_issue_authority": false,
          "invoice_issue_authority": false,
          "band_mutation_authority": false,
          "external_effects": false
        },
        {
          "tier_id": "enterprise_programme",
          "label": "Enterprise / Programme",
          "buyer_classes": [
            "C4",
            "C5"
          ],
          "eligible_buyer_classes": [
            "C4",
            "C5"
          ],
          "available": true,
          "reference_amount_zar": 30000,
          "pricing_truth": "GOVERNED_REFERENCE_POINT",
          "market_validation": "UNPROVED",
          "quote_issue_authority": false,
          "invoice_issue_authority": false,
          "band_mutation_authority": false,
          "external_effects": false
        }
      ],
      "pricing_state": "HYPOTHESIS",
      "commercial_validation": "UNPROVED",
      "customers_will_pay": "UNPROVED",
      "authority_created": false,
      "external_effects": false
    },
    {
      "slug": "homs-assess",
      "product_id": "homs_assess",
      "name": "HOMS Assess",
      "buyer_classes": [
        "C0",
        "C1",
        "C2",
        "C3",
        "C4"
      ],
      "pricing_model": "batch",
      "primary_scope_unit": "learner_script",
      "governed_reference_band_zar": {
        "min": 350,
        "max": 1800
      },
      "commercial_tiers": [
        {
          "tier_id": "individual_professional",
          "label": "Individual / Professional",
          "buyer_classes": [
            "C0",
            "C1"
          ],
          "eligible_buyer_classes": [
            "C0",
            "C1"
          ],
          "available": true,
          "reference_amount_zar": 350,
          "pricing_truth": "GOVERNED_REFERENCE_POINT",
          "market_validation": "UNPROVED",
          "quote_issue_authority": false,
          "invoice_issue_authority": false,
          "band_mutation_authority": false,
          "external_effects": false
        },
        {
          "tier_id": "team_department",
          "label": "Team / Department",
          "buyer_classes": [
            "C2",
            "C3"
          ],
          "eligible_buyer_classes": [
            "C2",
            "C3"
          ],
          "available": true,
          "reference_amount_zar": 1100,
          "pricing_truth": "GOVERNED_REFERENCE_POINT",
          "market_validation": "UNPROVED",
          "quote_issue_authority": false,
          "invoice_issue_authority": false,
          "band_mutation_authority": false,
          "external_effects": false
        },
        {
          "tier_id": "enterprise_programme",
          "label": "Enterprise / Programme",
          "buyer_classes": [
            "C4",
            "C5"
          ],
          "eligible_buyer_classes": [
            "C4"
          ],
          "available": true,
          "reference_amount_zar": 1800,
          "pricing_truth": "GOVERNED_REFERENCE_POINT",
          "market_validation": "UNPROVED",
          "quote_issue_authority": false,
          "invoice_issue_authority": false,
          "band_mutation_authority": false,
          "external_effects": false
        }
      ],
      "pricing_state": "HYPOTHESIS",
      "commercial_validation": "UNPROVED",
      "customers_will_pay": "UNPROVED",
      "authority_created": false,
      "external_effects": false
    },
    {
      "slug": "homs-curriculum",
      "product_id": "homs_curriculum",
      "name": "HOMS Curriculum",
      "buyer_classes": [
        "C1",
        "C2",
        "C3",
        "C4",
        "C5"
      ],
      "pricing_model": "project",
      "primary_scope_unit": "curriculum_unit",
      "governed_reference_band_zar": {
        "min": 1500,
        "max": 7500
      },
      "commercial_tiers": [
        {
          "tier_id": "individual_professional",
          "label": "Individual / Professional",
          "buyer_classes": [
            "C0",
            "C1"
          ],
          "eligible_buyer_classes": [
            "C1"
          ],
          "available": true,
          "reference_amount_zar": 1500,
          "pricing_truth": "GOVERNED_REFERENCE_POINT",
          "market_validation": "UNPROVED",
          "quote_issue_authority": false,
          "invoice_issue_authority": false,
          "band_mutation_authority": false,
          "external_effects": false
        },
        {
          "tier_id": "team_department",
          "label": "Team / Department",
          "buyer_classes": [
            "C2",
            "C3"
          ],
          "eligible_buyer_classes": [
            "C2",
            "C3"
          ],
          "available": true,
          "reference_amount_zar": 4500,
          "pricing_truth": "GOVERNED_REFERENCE_POINT",
          "market_validation": "UNPROVED",
          "quote_issue_authority": false,
          "invoice_issue_authority": false,
          "band_mutation_authority": false,
          "external_effects": false
        },
        {
          "tier_id": "enterprise_programme",
          "label": "Enterprise / Programme",
          "buyer_classes": [
            "C4",
            "C5"
          ],
          "eligible_buyer_classes": [
            "C4",
            "C5"
          ],
          "available": true,
          "reference_amount_zar": 7500,
          "pricing_truth": "GOVERNED_REFERENCE_POINT",
          "market_validation": "UNPROVED",
          "quote_issue_authority": false,
          "invoice_issue_authority": false,
          "band_mutation_authority": false,
          "external_effects": false
        }
      ],
      "pricing_state": "HYPOTHESIS",
      "commercial_validation": "UNPROVED",
      "customers_will_pay": "UNPROVED",
      "authority_created": false,
      "external_effects": false
    },
    {
      "slug": "homs-exam",
      "product_id": "homs_exam",
      "name": "HOMS Exam",
      "buyer_classes": [
        "C0",
        "C1",
        "C2",
        "C3",
        "C4"
      ],
      "pricing_model": "package",
      "primary_scope_unit": "assessment_package",
      "governed_reference_band_zar": {
        "min": 900,
        "max": 3500
      },
      "commercial_tiers": [
        {
          "tier_id": "individual_professional",
          "label": "Individual / Professional",
          "buyer_classes": [
            "C0",
            "C1"
          ],
          "eligible_buyer_classes": [
            "C0",
            "C1"
          ],
          "available": true,
          "reference_amount_zar": 900,
          "pricing_truth": "GOVERNED_REFERENCE_POINT",
          "market_validation": "UNPROVED",
          "quote_issue_authority": false,
          "invoice_issue_authority": false,
          "band_mutation_authority": false,
          "external_effects": false
        },
        {
          "tier_id": "team_department",
          "label": "Team / Department",
          "buyer_classes": [
            "C2",
            "C3"
          ],
          "eligible_buyer_classes": [
            "C2",
            "C3"
          ],
          "available": true,
          "reference_amount_zar": 2200,
          "pricing_truth": "GOVERNED_REFERENCE_POINT",
          "market_validation": "UNPROVED",
          "quote_issue_authority": false,
          "invoice_issue_authority": false,
          "band_mutation_authority": false,
          "external_effects": false
        },
        {
          "tier_id": "enterprise_programme",
          "label": "Enterprise / Programme",
          "buyer_classes": [
            "C4",
            "C5"
          ],
          "eligible_buyer_classes": [
            "C4"
          ],
          "available": true,
          "reference_amount_zar": 3500,
          "pricing_truth": "GOVERNED_REFERENCE_POINT",
          "market_validation": "UNPROVED",
          "quote_issue_authority": false,
          "invoice_issue_authority": false,
          "band_mutation_authority": false,
          "external_effects": false
        }
      ],
      "pricing_state": "HYPOTHESIS",
      "commercial_validation": "UNPROVED",
      "customers_will_pay": "UNPROVED",
      "authority_created": false,
      "external_effects": false
    },
    {
      "slug": "homs-learning-studio",
      "product_id": "homs_learning_studio",
      "name": "HOMS Learning Studio",
      "buyer_classes": [
        "C0",
        "C1",
        "C2",
        "C3",
        "C4"
      ],
      "pricing_model": "package",
      "primary_scope_unit": "topic_pack",
      "governed_reference_band_zar": {
        "min": 950,
        "max": 4500
      },
      "commercial_tiers": [
        {
          "tier_id": "individual_professional",
          "label": "Individual / Professional",
          "buyer_classes": [
            "C0",
            "C1"
          ],
          "eligible_buyer_classes": [
            "C0",
            "C1"
          ],
          "available": true,
          "reference_amount_zar": 950,
          "pricing_truth": "GOVERNED_REFERENCE_POINT",
          "market_validation": "UNPROVED",
          "quote_issue_authority": false,
          "invoice_issue_authority": false,
          "band_mutation_authority": false,
          "external_effects": false
        },
        {
          "tier_id": "team_department",
          "label": "Team / Department",
          "buyer_classes": [
            "C2",
            "C3"
          ],
          "eligible_buyer_classes": [
            "C2",
            "C3"
          ],
          "available": true,
          "reference_amount_zar": 2700,
          "pricing_truth": "GOVERNED_REFERENCE_POINT",
          "market_validation": "UNPROVED",
          "quote_issue_authority": false,
          "invoice_issue_authority": false,
          "band_mutation_authority": false,
          "external_effects": false
        },
        {
          "tier_id": "enterprise_programme",
          "label": "Enterprise / Programme",
          "buyer_classes": [
            "C4",
            "C5"
          ],
          "eligible_buyer_classes": [
            "C4"
          ],
          "available": true,
          "reference_amount_zar": 4500,
          "pricing_truth": "GOVERNED_REFERENCE_POINT",
          "market_validation": "UNPROVED",
          "quote_issue_authority": false,
          "invoice_issue_authority": false,
          "band_mutation_authority": false,
          "external_effects": false
        }
      ],
      "pricing_state": "HYPOTHESIS",
      "commercial_validation": "UNPROVED",
      "customers_will_pay": "UNPROVED",
      "authority_created": false,
      "external_effects": false
    },
    {
      "slug": "homs-moderate",
      "product_id": "homs_moderate",
      "name": "HOMS Moderate",
      "buyer_classes": [
        "C1",
        "C2",
        "C3",
        "C4"
      ],
      "pricing_model": "batch_review",
      "primary_scope_unit": "assessment_batch",
      "governed_reference_band_zar": {
        "min": 750,
        "max": 2500
      },
      "commercial_tiers": [
        {
          "tier_id": "individual_professional",
          "label": "Individual / Professional",
          "buyer_classes": [
            "C0",
            "C1"
          ],
          "eligible_buyer_classes": [
            "C1"
          ],
          "available": true,
          "reference_amount_zar": 750,
          "pricing_truth": "GOVERNED_REFERENCE_POINT",
          "market_validation": "UNPROVED",
          "quote_issue_authority": false,
          "invoice_issue_authority": false,
          "band_mutation_authority": false,
          "external_effects": false
        },
        {
          "tier_id": "team_department",
          "label": "Team / Department",
          "buyer_classes": [
            "C2",
            "C3"
          ],
          "eligible_buyer_classes": [
            "C2",
            "C3"
          ],
          "available": true,
          "reference_amount_zar": 1600,
          "pricing_truth": "GOVERNED_REFERENCE_POINT",
          "market_validation": "UNPROVED",
          "quote_issue_authority": false,
          "invoice_issue_authority": false,
          "band_mutation_authority": false,
          "external_effects": false
        },
        {
          "tier_id": "enterprise_programme",
          "label": "Enterprise / Programme",
          "buyer_classes": [
            "C4",
            "C5"
          ],
          "eligible_buyer_classes": [
            "C4"
          ],
          "available": true,
          "reference_amount_zar": 2500,
          "pricing_truth": "GOVERNED_REFERENCE_POINT",
          "market_validation": "UNPROVED",
          "quote_issue_authority": false,
          "invoice_issue_authority": false,
          "band_mutation_authority": false,
          "external_effects": false
        }
      ],
      "pricing_state": "HYPOTHESIS",
      "commercial_validation": "UNPROVED",
      "customers_will_pay": "UNPROVED",
      "authority_created": false,
      "external_effects": false
    },
    {
      "slug": "impactproof",
      "product_id": "impactproof",
      "name": "ImpactProof",
      "buyer_classes": [
        "C1",
        "C2",
        "C3",
        "C4",
        "C5"
      ],
      "pricing_model": "setup_plus_volume",
      "primary_scope_unit": "outcome_evidence_item",
      "governed_reference_band_zar": {
        "min": 950,
        "max": 5000
      },
      "commercial_tiers": [
        {
          "tier_id": "individual_professional",
          "label": "Individual / Professional",
          "buyer_classes": [
            "C0",
            "C1"
          ],
          "eligible_buyer_classes": [
            "C1"
          ],
          "available": true,
          "reference_amount_zar": 950,
          "pricing_truth": "GOVERNED_REFERENCE_POINT",
          "market_validation": "UNPROVED",
          "quote_issue_authority": false,
          "invoice_issue_authority": false,
          "band_mutation_authority": false,
          "external_effects": false
        },
        {
          "tier_id": "team_department",
          "label": "Team / Department",
          "buyer_classes": [
            "C2",
            "C3"
          ],
          "eligible_buyer_classes": [
            "C2",
            "C3"
          ],
          "available": true,
          "reference_amount_zar": 3000,
          "pricing_truth": "GOVERNED_REFERENCE_POINT",
          "market_validation": "UNPROVED",
          "quote_issue_authority": false,
          "invoice_issue_authority": false,
          "band_mutation_authority": false,
          "external_effects": false
        },
        {
          "tier_id": "enterprise_programme",
          "label": "Enterprise / Programme",
          "buyer_classes": [
            "C4",
            "C5"
          ],
          "eligible_buyer_classes": [
            "C4",
            "C5"
          ],
          "available": true,
          "reference_amount_zar": 5000,
          "pricing_truth": "GOVERNED_REFERENCE_POINT",
          "market_validation": "UNPROVED",
          "quote_issue_authority": false,
          "invoice_issue_authority": false,
          "band_mutation_authority": false,
          "external_effects": false
        }
      ],
      "pricing_state": "HYPOTHESIS",
      "commercial_validation": "UNPROVED",
      "customers_will_pay": "UNPROVED",
      "authority_created": false,
      "external_effects": false
    },
    {
      "slug": "incidentproof",
      "product_id": "incidentproof",
      "name": "IncidentProof",
      "buyer_classes": [
        "C2",
        "C3",
        "C4",
        "C5"
      ],
      "pricing_model": "incident_case",
      "primary_scope_unit": "incident",
      "governed_reference_band_zar": {
        "min": 5000,
        "max": 30000
      },
      "commercial_tiers": [
        {
          "tier_id": "individual_professional",
          "label": "Individual / Professional",
          "buyer_classes": [
            "C0",
            "C1"
          ],
          "eligible_buyer_classes": [],
          "available": false,
          "reference_amount_zar": null,
          "pricing_truth": "GOVERNED_REFERENCE_POINT",
          "market_validation": "UNPROVED",
          "quote_issue_authority": false,
          "invoice_issue_authority": false,
          "band_mutation_authority": false,
          "external_effects": false
        },
        {
          "tier_id": "team_department",
          "label": "Team / Department",
          "buyer_classes": [
            "C2",
            "C3"
          ],
          "eligible_buyer_classes": [
            "C2",
            "C3"
          ],
          "available": true,
          "reference_amount_zar": 17500,
          "pricing_truth": "GOVERNED_REFERENCE_POINT",
          "market_validation": "UNPROVED",
          "quote_issue_authority": false,
          "invoice_issue_authority": false,
          "band_mutation_authority": false,
          "external_effects": false
        },
        {
          "tier_id": "enterprise_programme",
          "label": "Enterprise / Programme",
          "buyer_classes": [
            "C4",
            "C5"
          ],
          "eligible_buyer_classes": [
            "C4",
            "C5"
          ],
          "available": true,
          "reference_amount_zar": 30000,
          "pricing_truth": "GOVERNED_REFERENCE_POINT",
          "market_validation": "UNPROVED",
          "quote_issue_authority": false,
          "invoice_issue_authority": false,
          "band_mutation_authority": false,
          "external_effects": false
        }
      ],
      "pricing_state": "HYPOTHESIS",
      "commercial_validation": "UNPROVED",
      "customers_will_pay": "UNPROVED",
      "authority_created": false,
      "external_effects": false
    },
    {
      "slug": "investorproof",
      "product_id": "investorproof",
      "name": "InvestorProof",
      "buyer_classes": [
        "C0",
        "C1",
        "C2",
        "C3"
      ],
      "pricing_model": "readiness_pack",
      "primary_scope_unit": "investor_readiness_item",
      "governed_reference_band_zar": {
        "min": 750,
        "max": 3500
      },
      "commercial_tiers": [
        {
          "tier_id": "individual_professional",
          "label": "Individual / Professional",
          "buyer_classes": [
            "C0",
            "C1"
          ],
          "eligible_buyer_classes": [
            "C0",
            "C1"
          ],
          "available": true,
          "reference_amount_zar": 750,
          "pricing_truth": "GOVERNED_REFERENCE_POINT",
          "market_validation": "UNPROVED",
          "quote_issue_authority": false,
          "invoice_issue_authority": false,
          "band_mutation_authority": false,
          "external_effects": false
        },
        {
          "tier_id": "team_department",
          "label": "Team / Department",
          "buyer_classes": [
            "C2",
            "C3"
          ],
          "eligible_buyer_classes": [
            "C2",
            "C3"
          ],
          "available": true,
          "reference_amount_zar": 2100,
          "pricing_truth": "GOVERNED_REFERENCE_POINT",
          "market_validation": "UNPROVED",
          "quote_issue_authority": false,
          "invoice_issue_authority": false,
          "band_mutation_authority": false,
          "external_effects": false
        },
        {
          "tier_id": "enterprise_programme",
          "label": "Enterprise / Programme",
          "buyer_classes": [
            "C4",
            "C5"
          ],
          "eligible_buyer_classes": [],
          "available": false,
          "reference_amount_zar": null,
          "pricing_truth": "GOVERNED_REFERENCE_POINT",
          "market_validation": "UNPROVED",
          "quote_issue_authority": false,
          "invoice_issue_authority": false,
          "band_mutation_authority": false,
          "external_effects": false
        }
      ],
      "pricing_state": "HYPOTHESIS",
      "commercial_validation": "UNPROVED",
      "customers_will_pay": "UNPROVED",
      "authority_created": false,
      "external_effects": false
    },
    {
      "slug": "launch-studio",
      "product_id": "launch_studio",
      "name": "Launch Studio",
      "buyer_classes": [
        "C1",
        "C2",
        "C3",
        "C4"
      ],
      "pricing_model": "studio_project",
      "primary_scope_unit": "launch_channel",
      "governed_reference_band_zar": {
        "min": 1500,
        "max": 7500
      },
      "commercial_tiers": [
        {
          "tier_id": "individual_professional",
          "label": "Individual / Professional",
          "buyer_classes": [
            "C0",
            "C1"
          ],
          "eligible_buyer_classes": [
            "C1"
          ],
          "available": true,
          "reference_amount_zar": 1500,
          "pricing_truth": "GOVERNED_REFERENCE_POINT",
          "market_validation": "UNPROVED",
          "quote_issue_authority": false,
          "invoice_issue_authority": false,
          "band_mutation_authority": false,
          "external_effects": false
        },
        {
          "tier_id": "team_department",
          "label": "Team / Department",
          "buyer_classes": [
            "C2",
            "C3"
          ],
          "eligible_buyer_classes": [
            "C2",
            "C3"
          ],
          "available": true,
          "reference_amount_zar": 4500,
          "pricing_truth": "GOVERNED_REFERENCE_POINT",
          "market_validation": "UNPROVED",
          "quote_issue_authority": false,
          "invoice_issue_authority": false,
          "band_mutation_authority": false,
          "external_effects": false
        },
        {
          "tier_id": "enterprise_programme",
          "label": "Enterprise / Programme",
          "buyer_classes": [
            "C4",
            "C5"
          ],
          "eligible_buyer_classes": [
            "C4"
          ],
          "available": true,
          "reference_amount_zar": 7500,
          "pricing_truth": "GOVERNED_REFERENCE_POINT",
          "market_validation": "UNPROVED",
          "quote_issue_authority": false,
          "invoice_issue_authority": false,
          "band_mutation_authority": false,
          "external_effects": false
        }
      ],
      "pricing_state": "HYPOTHESIS",
      "commercial_validation": "UNPROVED",
      "customers_will_pay": "UNPROVED",
      "authority_created": false,
      "external_effects": false
    },
    {
      "slug": "market-radar",
      "product_id": "market_radar",
      "name": "Market Radar",
      "buyer_classes": [
        "C1",
        "C2",
        "C3",
        "C4"
      ],
      "pricing_model": "research_cycle",
      "primary_scope_unit": "market_segment",
      "governed_reference_band_zar": {
        "min": 500,
        "max": 3000
      },
      "commercial_tiers": [
        {
          "tier_id": "individual_professional",
          "label": "Individual / Professional",
          "buyer_classes": [
            "C0",
            "C1"
          ],
          "eligible_buyer_classes": [
            "C1"
          ],
          "available": true,
          "reference_amount_zar": 500,
          "pricing_truth": "GOVERNED_REFERENCE_POINT",
          "market_validation": "UNPROVED",
          "quote_issue_authority": false,
          "invoice_issue_authority": false,
          "band_mutation_authority": false,
          "external_effects": false
        },
        {
          "tier_id": "team_department",
          "label": "Team / Department",
          "buyer_classes": [
            "C2",
            "C3"
          ],
          "eligible_buyer_classes": [
            "C2",
            "C3"
          ],
          "available": true,
          "reference_amount_zar": 1750,
          "pricing_truth": "GOVERNED_REFERENCE_POINT",
          "market_validation": "UNPROVED",
          "quote_issue_authority": false,
          "invoice_issue_authority": false,
          "band_mutation_authority": false,
          "external_effects": false
        },
        {
          "tier_id": "enterprise_programme",
          "label": "Enterprise / Programme",
          "buyer_classes": [
            "C4",
            "C5"
          ],
          "eligible_buyer_classes": [
            "C4"
          ],
          "available": true,
          "reference_amount_zar": 3000,
          "pricing_truth": "GOVERNED_REFERENCE_POINT",
          "market_validation": "UNPROVED",
          "quote_issue_authority": false,
          "invoice_issue_authority": false,
          "band_mutation_authority": false,
          "external_effects": false
        }
      ],
      "pricing_state": "HYPOTHESIS",
      "commercial_validation": "UNPROVED",
      "customers_will_pay": "UNPROVED",
      "authority_created": false,
      "external_effects": false
    },
    {
      "slug": "modelproof",
      "product_id": "modelproof",
      "name": "ModelProof",
      "buyer_classes": [
        "C2",
        "C3",
        "C4",
        "C5"
      ],
      "pricing_model": "per_model",
      "primary_scope_unit": "model",
      "governed_reference_band_zar": {
        "min": 5000,
        "max": 25000
      },
      "commercial_tiers": [
        {
          "tier_id": "individual_professional",
          "label": "Individual / Professional",
          "buyer_classes": [
            "C0",
            "C1"
          ],
          "eligible_buyer_classes": [],
          "available": false,
          "reference_amount_zar": null,
          "pricing_truth": "GOVERNED_REFERENCE_POINT",
          "market_validation": "UNPROVED",
          "quote_issue_authority": false,
          "invoice_issue_authority": false,
          "band_mutation_authority": false,
          "external_effects": false
        },
        {
          "tier_id": "team_department",
          "label": "Team / Department",
          "buyer_classes": [
            "C2",
            "C3"
          ],
          "eligible_buyer_classes": [
            "C2",
            "C3"
          ],
          "available": true,
          "reference_amount_zar": 15000,
          "pricing_truth": "GOVERNED_REFERENCE_POINT",
          "market_validation": "UNPROVED",
          "quote_issue_authority": false,
          "invoice_issue_authority": false,
          "band_mutation_authority": false,
          "external_effects": false
        },
        {
          "tier_id": "enterprise_programme",
          "label": "Enterprise / Programme",
          "buyer_classes": [
            "C4",
            "C5"
          ],
          "eligible_buyer_classes": [
            "C4",
            "C5"
          ],
          "available": true,
          "reference_amount_zar": 25000,
          "pricing_truth": "GOVERNED_REFERENCE_POINT",
          "market_validation": "UNPROVED",
          "quote_issue_authority": false,
          "invoice_issue_authority": false,
          "band_mutation_authority": false,
          "external_effects": false
        }
      ],
      "pricing_state": "HYPOTHESIS",
      "commercial_validation": "UNPROVED",
      "customers_will_pay": "UNPROVED",
      "authority_created": false,
      "external_effects": false
    },
    {
      "slug": "offer-lab",
      "product_id": "offer_lab",
      "name": "Offer Lab",
      "buyer_classes": [
        "C1",
        "C2",
        "C3",
        "C4"
      ],
      "pricing_model": "experiment",
      "primary_scope_unit": "offer_variant",
      "governed_reference_band_zar": {
        "min": 750,
        "max": 3500
      },
      "commercial_tiers": [
        {
          "tier_id": "individual_professional",
          "label": "Individual / Professional",
          "buyer_classes": [
            "C0",
            "C1"
          ],
          "eligible_buyer_classes": [
            "C1"
          ],
          "available": true,
          "reference_amount_zar": 750,
          "pricing_truth": "GOVERNED_REFERENCE_POINT",
          "market_validation": "UNPROVED",
          "quote_issue_authority": false,
          "invoice_issue_authority": false,
          "band_mutation_authority": false,
          "external_effects": false
        },
        {
          "tier_id": "team_department",
          "label": "Team / Department",
          "buyer_classes": [
            "C2",
            "C3"
          ],
          "eligible_buyer_classes": [
            "C2",
            "C3"
          ],
          "available": true,
          "reference_amount_zar": 2100,
          "pricing_truth": "GOVERNED_REFERENCE_POINT",
          "market_validation": "UNPROVED",
          "quote_issue_authority": false,
          "invoice_issue_authority": false,
          "band_mutation_authority": false,
          "external_effects": false
        },
        {
          "tier_id": "enterprise_programme",
          "label": "Enterprise / Programme",
          "buyer_classes": [
            "C4",
            "C5"
          ],
          "eligible_buyer_classes": [
            "C4"
          ],
          "available": true,
          "reference_amount_zar": 3500,
          "pricing_truth": "GOVERNED_REFERENCE_POINT",
          "market_validation": "UNPROVED",
          "quote_issue_authority": false,
          "invoice_issue_authority": false,
          "band_mutation_authority": false,
          "external_effects": false
        }
      ],
      "pricing_state": "HYPOTHESIS",
      "commercial_validation": "UNPROVED",
      "customers_will_pay": "UNPROVED",
      "authority_created": false,
      "external_effects": false
    },
    {
      "slug": "opportunity-foundry",
      "product_id": "opportunity_foundry",
      "name": "Opportunity Foundry",
      "buyer_classes": [
        "C1",
        "C2",
        "C3",
        "C4"
      ],
      "pricing_model": "research_cycle",
      "primary_scope_unit": "opportunity_scan",
      "governed_reference_band_zar": {
        "min": 750,
        "max": 4000
      },
      "commercial_tiers": [
        {
          "tier_id": "individual_professional",
          "label": "Individual / Professional",
          "buyer_classes": [
            "C0",
            "C1"
          ],
          "eligible_buyer_classes": [
            "C1"
          ],
          "available": true,
          "reference_amount_zar": 750,
          "pricing_truth": "GOVERNED_REFERENCE_POINT",
          "market_validation": "UNPROVED",
          "quote_issue_authority": false,
          "invoice_issue_authority": false,
          "band_mutation_authority": false,
          "external_effects": false
        },
        {
          "tier_id": "team_department",
          "label": "Team / Department",
          "buyer_classes": [
            "C2",
            "C3"
          ],
          "eligible_buyer_classes": [
            "C2",
            "C3"
          ],
          "available": true,
          "reference_amount_zar": 2400,
          "pricing_truth": "GOVERNED_REFERENCE_POINT",
          "market_validation": "UNPROVED",
          "quote_issue_authority": false,
          "invoice_issue_authority": false,
          "band_mutation_authority": false,
          "external_effects": false
        },
        {
          "tier_id": "enterprise_programme",
          "label": "Enterprise / Programme",
          "buyer_classes": [
            "C4",
            "C5"
          ],
          "eligible_buyer_classes": [
            "C4"
          ],
          "available": true,
          "reference_amount_zar": 4000,
          "pricing_truth": "GOVERNED_REFERENCE_POINT",
          "market_validation": "UNPROVED",
          "quote_issue_authority": false,
          "invoice_issue_authority": false,
          "band_mutation_authority": false,
          "external_effects": false
        }
      ],
      "pricing_state": "HYPOTHESIS",
      "commercial_validation": "UNPROVED",
      "customers_will_pay": "UNPROVED",
      "authority_created": false,
      "external_effects": false
    },
    {
      "slug": "permitproof",
      "product_id": "permitproof",
      "name": "PermitProof",
      "buyer_classes": [
        "C1",
        "C2",
        "C3",
        "C4",
        "C5"
      ],
      "pricing_model": "case_scope",
      "primary_scope_unit": "permit_requirement",
      "governed_reference_band_zar": {
        "min": 2000,
        "max": 10000
      },
      "commercial_tiers": [
        {
          "tier_id": "individual_professional",
          "label": "Individual / Professional",
          "buyer_classes": [
            "C0",
            "C1"
          ],
          "eligible_buyer_classes": [
            "C1"
          ],
          "available": true,
          "reference_amount_zar": 2000,
          "pricing_truth": "GOVERNED_REFERENCE_POINT",
          "market_validation": "UNPROVED",
          "quote_issue_authority": false,
          "invoice_issue_authority": false,
          "band_mutation_authority": false,
          "external_effects": false
        },
        {
          "tier_id": "team_department",
          "label": "Team / Department",
          "buyer_classes": [
            "C2",
            "C3"
          ],
          "eligible_buyer_classes": [
            "C2",
            "C3"
          ],
          "available": true,
          "reference_amount_zar": 6000,
          "pricing_truth": "GOVERNED_REFERENCE_POINT",
          "market_validation": "UNPROVED",
          "quote_issue_authority": false,
          "invoice_issue_authority": false,
          "band_mutation_authority": false,
          "external_effects": false
        },
        {
          "tier_id": "enterprise_programme",
          "label": "Enterprise / Programme",
          "buyer_classes": [
            "C4",
            "C5"
          ],
          "eligible_buyer_classes": [
            "C4",
            "C5"
          ],
          "available": true,
          "reference_amount_zar": 10000,
          "pricing_truth": "GOVERNED_REFERENCE_POINT",
          "market_validation": "UNPROVED",
          "quote_issue_authority": false,
          "invoice_issue_authority": false,
          "band_mutation_authority": false,
          "external_effects": false
        }
      ],
      "pricing_state": "HYPOTHESIS",
      "commercial_validation": "UNPROVED",
      "customers_will_pay": "UNPROVED",
      "authority_created": false,
      "external_effects": false
    },
    {
      "slug": "policyproof",
      "product_id": "policyproof",
      "name": "PolicyProof",
      "buyer_classes": [
        "C1",
        "C2",
        "C3",
        "C4"
      ],
      "pricing_model": "document_scope",
      "primary_scope_unit": "policy_clause",
      "governed_reference_band_zar": {
        "min": 1200,
        "max": 5000
      },
      "commercial_tiers": [
        {
          "tier_id": "individual_professional",
          "label": "Individual / Professional",
          "buyer_classes": [
            "C0",
            "C1"
          ],
          "eligible_buyer_classes": [
            "C1"
          ],
          "available": true,
          "reference_amount_zar": 1200,
          "pricing_truth": "GOVERNED_REFERENCE_POINT",
          "market_validation": "UNPROVED",
          "quote_issue_authority": false,
          "invoice_issue_authority": false,
          "band_mutation_authority": false,
          "external_effects": false
        },
        {
          "tier_id": "team_department",
          "label": "Team / Department",
          "buyer_classes": [
            "C2",
            "C3"
          ],
          "eligible_buyer_classes": [
            "C2",
            "C3"
          ],
          "available": true,
          "reference_amount_zar": 3100,
          "pricing_truth": "GOVERNED_REFERENCE_POINT",
          "market_validation": "UNPROVED",
          "quote_issue_authority": false,
          "invoice_issue_authority": false,
          "band_mutation_authority": false,
          "external_effects": false
        },
        {
          "tier_id": "enterprise_programme",
          "label": "Enterprise / Programme",
          "buyer_classes": [
            "C4",
            "C5"
          ],
          "eligible_buyer_classes": [
            "C4"
          ],
          "available": true,
          "reference_amount_zar": 5000,
          "pricing_truth": "GOVERNED_REFERENCE_POINT",
          "market_validation": "UNPROVED",
          "quote_issue_authority": false,
          "invoice_issue_authority": false,
          "band_mutation_authority": false,
          "external_effects": false
        }
      ],
      "pricing_state": "HYPOTHESIS",
      "commercial_validation": "UNPROVED",
      "customers_will_pay": "UNPROVED",
      "authority_created": false,
      "external_effects": false
    },
    {
      "slug": "popia-readiness",
      "product_id": "popia_readiness",
      "name": "POPIA Readiness",
      "buyer_classes": [
        "C1",
        "C2",
        "C3",
        "C4",
        "C5"
      ],
      "pricing_model": "readiness_programme",
      "primary_scope_unit": "privacy_requirement",
      "governed_reference_band_zar": {
        "min": 2500,
        "max": 15000
      },
      "commercial_tiers": [
        {
          "tier_id": "individual_professional",
          "label": "Individual / Professional",
          "buyer_classes": [
            "C0",
            "C1"
          ],
          "eligible_buyer_classes": [
            "C1"
          ],
          "available": true,
          "reference_amount_zar": 2500,
          "pricing_truth": "GOVERNED_REFERENCE_POINT",
          "market_validation": "UNPROVED",
          "quote_issue_authority": false,
          "invoice_issue_authority": false,
          "band_mutation_authority": false,
          "external_effects": false
        },
        {
          "tier_id": "team_department",
          "label": "Team / Department",
          "buyer_classes": [
            "C2",
            "C3"
          ],
          "eligible_buyer_classes": [
            "C2",
            "C3"
          ],
          "available": true,
          "reference_amount_zar": 8750,
          "pricing_truth": "GOVERNED_REFERENCE_POINT",
          "market_validation": "UNPROVED",
          "quote_issue_authority": false,
          "invoice_issue_authority": false,
          "band_mutation_authority": false,
          "external_effects": false
        },
        {
          "tier_id": "enterprise_programme",
          "label": "Enterprise / Programme",
          "buyer_classes": [
            "C4",
            "C5"
          ],
          "eligible_buyer_classes": [
            "C4",
            "C5"
          ],
          "available": true,
          "reference_amount_zar": 15000,
          "pricing_truth": "GOVERNED_REFERENCE_POINT",
          "market_validation": "UNPROVED",
          "quote_issue_authority": false,
          "invoice_issue_authority": false,
          "band_mutation_authority": false,
          "external_effects": false
        }
      ],
      "pricing_state": "HYPOTHESIS",
      "commercial_validation": "UNPROVED",
      "customers_will_pay": "UNPROVED",
      "authority_created": false,
      "external_effects": false
    },
    {
      "slug": "professional-correspondence",
      "product_id": "professional_correspondence",
      "name": "Professional Correspondence",
      "buyer_classes": [
        "C0",
        "C1",
        "C2"
      ],
      "pricing_model": "per_item",
      "primary_scope_unit": "correspondence_item",
      "governed_reference_band_zar": {
        "min": 150,
        "max": 750
      },
      "commercial_tiers": [
        {
          "tier_id": "individual_professional",
          "label": "Individual / Professional",
          "buyer_classes": [
            "C0",
            "C1"
          ],
          "eligible_buyer_classes": [
            "C0",
            "C1"
          ],
          "available": true,
          "reference_amount_zar": 150,
          "pricing_truth": "GOVERNED_REFERENCE_POINT",
          "market_validation": "UNPROVED",
          "quote_issue_authority": false,
          "invoice_issue_authority": false,
          "band_mutation_authority": false,
          "external_effects": false
        },
        {
          "tier_id": "team_department",
          "label": "Team / Department",
          "buyer_classes": [
            "C2",
            "C3"
          ],
          "eligible_buyer_classes": [
            "C2"
          ],
          "available": true,
          "reference_amount_zar": 450,
          "pricing_truth": "GOVERNED_REFERENCE_POINT",
          "market_validation": "UNPROVED",
          "quote_issue_authority": false,
          "invoice_issue_authority": false,
          "band_mutation_authority": false,
          "external_effects": false
        },
        {
          "tier_id": "enterprise_programme",
          "label": "Enterprise / Programme",
          "buyer_classes": [
            "C4",
            "C5"
          ],
          "eligible_buyer_classes": [],
          "available": false,
          "reference_amount_zar": null,
          "pricing_truth": "GOVERNED_REFERENCE_POINT",
          "market_validation": "UNPROVED",
          "quote_issue_authority": false,
          "invoice_issue_authority": false,
          "band_mutation_authority": false,
          "external_effects": false
        }
      ],
      "pricing_state": "HYPOTHESIS",
      "commercial_validation": "UNPROVED",
      "customers_will_pay": "UNPROVED",
      "authority_created": false,
      "external_effects": false
    },
    {
      "slug": "professional-correspondence-studio",
      "product_id": "professional_correspondence_studio",
      "name": "Professional Correspondence Studio",
      "buyer_classes": [
        "C1",
        "C2",
        "C3",
        "C4"
      ],
      "pricing_model": "studio_project",
      "primary_scope_unit": "correspondence_pack",
      "governed_reference_band_zar": {
        "min": 750,
        "max": 3500
      },
      "commercial_tiers": [
        {
          "tier_id": "individual_professional",
          "label": "Individual / Professional",
          "buyer_classes": [
            "C0",
            "C1"
          ],
          "eligible_buyer_classes": [
            "C1"
          ],
          "available": true,
          "reference_amount_zar": 750,
          "pricing_truth": "GOVERNED_REFERENCE_POINT",
          "market_validation": "UNPROVED",
          "quote_issue_authority": false,
          "invoice_issue_authority": false,
          "band_mutation_authority": false,
          "external_effects": false
        },
        {
          "tier_id": "team_department",
          "label": "Team / Department",
          "buyer_classes": [
            "C2",
            "C3"
          ],
          "eligible_buyer_classes": [
            "C2",
            "C3"
          ],
          "available": true,
          "reference_amount_zar": 2100,
          "pricing_truth": "GOVERNED_REFERENCE_POINT",
          "market_validation": "UNPROVED",
          "quote_issue_authority": false,
          "invoice_issue_authority": false,
          "band_mutation_authority": false,
          "external_effects": false
        },
        {
          "tier_id": "enterprise_programme",
          "label": "Enterprise / Programme",
          "buyer_classes": [
            "C4",
            "C5"
          ],
          "eligible_buyer_classes": [
            "C4"
          ],
          "available": true,
          "reference_amount_zar": 3500,
          "pricing_truth": "GOVERNED_REFERENCE_POINT",
          "market_validation": "UNPROVED",
          "quote_issue_authority": false,
          "invoice_issue_authority": false,
          "band_mutation_authority": false,
          "external_effects": false
        }
      ],
      "pricing_state": "HYPOTHESIS",
      "commercial_validation": "UNPROVED",
      "customers_will_pay": "UNPROVED",
      "authority_created": false,
      "external_effects": false
    },
    {
      "slug": "programmeproof",
      "product_id": "programmeproof",
      "name": "ProgrammeProof",
      "buyer_classes": [
        "C2",
        "C3",
        "C4",
        "C5"
      ],
      "pricing_model": "programme",
      "primary_scope_unit": "programme_indicator",
      "governed_reference_band_zar": {
        "min": 3500,
        "max": 15000
      },
      "commercial_tiers": [
        {
          "tier_id": "individual_professional",
          "label": "Individual / Professional",
          "buyer_classes": [
            "C0",
            "C1"
          ],
          "eligible_buyer_classes": [],
          "available": false,
          "reference_amount_zar": null,
          "pricing_truth": "GOVERNED_REFERENCE_POINT",
          "market_validation": "UNPROVED",
          "quote_issue_authority": false,
          "invoice_issue_authority": false,
          "band_mutation_authority": false,
          "external_effects": false
        },
        {
          "tier_id": "team_department",
          "label": "Team / Department",
          "buyer_classes": [
            "C2",
            "C3"
          ],
          "eligible_buyer_classes": [
            "C2",
            "C3"
          ],
          "available": true,
          "reference_amount_zar": 9250,
          "pricing_truth": "GOVERNED_REFERENCE_POINT",
          "market_validation": "UNPROVED",
          "quote_issue_authority": false,
          "invoice_issue_authority": false,
          "band_mutation_authority": false,
          "external_effects": false
        },
        {
          "tier_id": "enterprise_programme",
          "label": "Enterprise / Programme",
          "buyer_classes": [
            "C4",
            "C5"
          ],
          "eligible_buyer_classes": [
            "C4",
            "C5"
          ],
          "available": true,
          "reference_amount_zar": 15000,
          "pricing_truth": "GOVERNED_REFERENCE_POINT",
          "market_validation": "UNPROVED",
          "quote_issue_authority": false,
          "invoice_issue_authority": false,
          "band_mutation_authority": false,
          "external_effects": false
        }
      ],
      "pricing_state": "HYPOTHESIS",
      "commercial_validation": "UNPROVED",
      "customers_will_pay": "UNPROVED",
      "authority_created": false,
      "external_effects": false
    },
    {
      "slug": "projectproof",
      "product_id": "projectproof",
      "name": "ProjectProof",
      "buyer_classes": [
        "C1",
        "C2",
        "C3",
        "C4"
      ],
      "pricing_model": "evidence_pack",
      "primary_scope_unit": "project_evidence_item",
      "governed_reference_band_zar": {
        "min": 750,
        "max": 3500
      },
      "commercial_tiers": [
        {
          "tier_id": "individual_professional",
          "label": "Individual / Professional",
          "buyer_classes": [
            "C0",
            "C1"
          ],
          "eligible_buyer_classes": [
            "C1"
          ],
          "available": true,
          "reference_amount_zar": 750,
          "pricing_truth": "GOVERNED_REFERENCE_POINT",
          "market_validation": "UNPROVED",
          "quote_issue_authority": false,
          "invoice_issue_authority": false,
          "band_mutation_authority": false,
          "external_effects": false
        },
        {
          "tier_id": "team_department",
          "label": "Team / Department",
          "buyer_classes": [
            "C2",
            "C3"
          ],
          "eligible_buyer_classes": [
            "C2",
            "C3"
          ],
          "available": true,
          "reference_amount_zar": 2100,
          "pricing_truth": "GOVERNED_REFERENCE_POINT",
          "market_validation": "UNPROVED",
          "quote_issue_authority": false,
          "invoice_issue_authority": false,
          "band_mutation_authority": false,
          "external_effects": false
        },
        {
          "tier_id": "enterprise_programme",
          "label": "Enterprise / Programme",
          "buyer_classes": [
            "C4",
            "C5"
          ],
          "eligible_buyer_classes": [
            "C4"
          ],
          "available": true,
          "reference_amount_zar": 3500,
          "pricing_truth": "GOVERNED_REFERENCE_POINT",
          "market_validation": "UNPROVED",
          "quote_issue_authority": false,
          "invoice_issue_authority": false,
          "band_mutation_authority": false,
          "external_effects": false
        }
      ],
      "pricing_state": "HYPOTHESIS",
      "commercial_validation": "UNPROVED",
      "customers_will_pay": "UNPROVED",
      "authority_created": false,
      "external_effects": false
    },
    {
      "slug": "promotionproof",
      "product_id": "promotionproof",
      "name": "PromotionProof",
      "buyer_classes": [
        "C0",
        "C1",
        "C2",
        "C3",
        "C4"
      ],
      "pricing_model": "evidence_pack",
      "primary_scope_unit": "promotion_evidence_item",
      "governed_reference_band_zar": {
        "min": 500,
        "max": 2200
      },
      "commercial_tiers": [
        {
          "tier_id": "individual_professional",
          "label": "Individual / Professional",
          "buyer_classes": [
            "C0",
            "C1"
          ],
          "eligible_buyer_classes": [
            "C0",
            "C1"
          ],
          "available": true,
          "reference_amount_zar": 500,
          "pricing_truth": "GOVERNED_REFERENCE_POINT",
          "market_validation": "UNPROVED",
          "quote_issue_authority": false,
          "invoice_issue_authority": false,
          "band_mutation_authority": false,
          "external_effects": false
        },
        {
          "tier_id": "team_department",
          "label": "Team / Department",
          "buyer_classes": [
            "C2",
            "C3"
          ],
          "eligible_buyer_classes": [
            "C2",
            "C3"
          ],
          "available": true,
          "reference_amount_zar": 1350,
          "pricing_truth": "GOVERNED_REFERENCE_POINT",
          "market_validation": "UNPROVED",
          "quote_issue_authority": false,
          "invoice_issue_authority": false,
          "band_mutation_authority": false,
          "external_effects": false
        },
        {
          "tier_id": "enterprise_programme",
          "label": "Enterprise / Programme",
          "buyer_classes": [
            "C4",
            "C5"
          ],
          "eligible_buyer_classes": [
            "C4"
          ],
          "available": true,
          "reference_amount_zar": 2200,
          "pricing_truth": "GOVERNED_REFERENCE_POINT",
          "market_validation": "UNPROVED",
          "quote_issue_authority": false,
          "invoice_issue_authority": false,
          "band_mutation_authority": false,
          "external_effects": false
        }
      ],
      "pricing_state": "HYPOTHESIS",
      "commercial_validation": "UNPROVED",
      "customers_will_pay": "UNPROVED",
      "authority_created": false,
      "external_effects": false
    },
    {
      "slug": "qualityproof",
      "product_id": "qualityproof",
      "name": "QualityProof",
      "buyer_classes": [
        "C2",
        "C3",
        "C4",
        "C5"
      ],
      "pricing_model": "setup_plus_volume",
      "primary_scope_unit": "quality_control",
      "governed_reference_band_zar": {
        "min": 3000,
        "max": 15000
      },
      "commercial_tiers": [
        {
          "tier_id": "individual_professional",
          "label": "Individual / Professional",
          "buyer_classes": [
            "C0",
            "C1"
          ],
          "eligible_buyer_classes": [],
          "available": false,
          "reference_amount_zar": null,
          "pricing_truth": "GOVERNED_REFERENCE_POINT",
          "market_validation": "UNPROVED",
          "quote_issue_authority": false,
          "invoice_issue_authority": false,
          "band_mutation_authority": false,
          "external_effects": false
        },
        {
          "tier_id": "team_department",
          "label": "Team / Department",
          "buyer_classes": [
            "C2",
            "C3"
          ],
          "eligible_buyer_classes": [
            "C2",
            "C3"
          ],
          "available": true,
          "reference_amount_zar": 9000,
          "pricing_truth": "GOVERNED_REFERENCE_POINT",
          "market_validation": "UNPROVED",
          "quote_issue_authority": false,
          "invoice_issue_authority": false,
          "band_mutation_authority": false,
          "external_effects": false
        },
        {
          "tier_id": "enterprise_programme",
          "label": "Enterprise / Programme",
          "buyer_classes": [
            "C4",
            "C5"
          ],
          "eligible_buyer_classes": [
            "C4",
            "C5"
          ],
          "available": true,
          "reference_amount_zar": 15000,
          "pricing_truth": "GOVERNED_REFERENCE_POINT",
          "market_validation": "UNPROVED",
          "quote_issue_authority": false,
          "invoice_issue_authority": false,
          "band_mutation_authority": false,
          "external_effects": false
        }
      ],
      "pricing_state": "HYPOTHESIS",
      "commercial_validation": "UNPROVED",
      "customers_will_pay": "UNPROVED",
      "authority_created": false,
      "external_effects": false
    },
    {
      "slug": "releaseproof",
      "product_id": "releaseproof",
      "name": "ReleaseProof",
      "buyer_classes": [
        "C2",
        "C3",
        "C4",
        "C5"
      ],
      "pricing_model": "per_release",
      "primary_scope_unit": "release",
      "governed_reference_band_zar": {
        "min": 4000,
        "max": 20000
      },
      "commercial_tiers": [
        {
          "tier_id": "individual_professional",
          "label": "Individual / Professional",
          "buyer_classes": [
            "C0",
            "C1"
          ],
          "eligible_buyer_classes": [],
          "available": false,
          "reference_amount_zar": null,
          "pricing_truth": "GOVERNED_REFERENCE_POINT",
          "market_validation": "UNPROVED",
          "quote_issue_authority": false,
          "invoice_issue_authority": false,
          "band_mutation_authority": false,
          "external_effects": false
        },
        {
          "tier_id": "team_department",
          "label": "Team / Department",
          "buyer_classes": [
            "C2",
            "C3"
          ],
          "eligible_buyer_classes": [
            "C2",
            "C3"
          ],
          "available": true,
          "reference_amount_zar": 12000,
          "pricing_truth": "GOVERNED_REFERENCE_POINT",
          "market_validation": "UNPROVED",
          "quote_issue_authority": false,
          "invoice_issue_authority": false,
          "band_mutation_authority": false,
          "external_effects": false
        },
        {
          "tier_id": "enterprise_programme",
          "label": "Enterprise / Programme",
          "buyer_classes": [
            "C4",
            "C5"
          ],
          "eligible_buyer_classes": [
            "C4",
            "C5"
          ],
          "available": true,
          "reference_amount_zar": 20000,
          "pricing_truth": "GOVERNED_REFERENCE_POINT",
          "market_validation": "UNPROVED",
          "quote_issue_authority": false,
          "invoice_issue_authority": false,
          "band_mutation_authority": false,
          "external_effects": false
        }
      ],
      "pricing_state": "HYPOTHESIS",
      "commercial_validation": "UNPROVED",
      "customers_will_pay": "UNPROVED",
      "authority_created": false,
      "external_effects": false
    },
    {
      "slug": "report-pitch-studio",
      "product_id": "report_pitch_studio",
      "name": "Report & Pitch Studio",
      "buyer_classes": [
        "C0",
        "C1",
        "C2",
        "C3",
        "C4"
      ],
      "pricing_model": "studio_project",
      "primary_scope_unit": "report_page",
      "governed_reference_band_zar": {
        "min": 750,
        "max": 5000
      },
      "commercial_tiers": [
        {
          "tier_id": "individual_professional",
          "label": "Individual / Professional",
          "buyer_classes": [
            "C0",
            "C1"
          ],
          "eligible_buyer_classes": [
            "C0",
            "C1"
          ],
          "available": true,
          "reference_amount_zar": 750,
          "pricing_truth": "GOVERNED_REFERENCE_POINT",
          "market_validation": "UNPROVED",
          "quote_issue_authority": false,
          "invoice_issue_authority": false,
          "band_mutation_authority": false,
          "external_effects": false
        },
        {
          "tier_id": "team_department",
          "label": "Team / Department",
          "buyer_classes": [
            "C2",
            "C3"
          ],
          "eligible_buyer_classes": [
            "C2",
            "C3"
          ],
          "available": true,
          "reference_amount_zar": 2900,
          "pricing_truth": "GOVERNED_REFERENCE_POINT",
          "market_validation": "UNPROVED",
          "quote_issue_authority": false,
          "invoice_issue_authority": false,
          "band_mutation_authority": false,
          "external_effects": false
        },
        {
          "tier_id": "enterprise_programme",
          "label": "Enterprise / Programme",
          "buyer_classes": [
            "C4",
            "C5"
          ],
          "eligible_buyer_classes": [
            "C4"
          ],
          "available": true,
          "reference_amount_zar": 5000,
          "pricing_truth": "GOVERNED_REFERENCE_POINT",
          "market_validation": "UNPROVED",
          "quote_issue_authority": false,
          "invoice_issue_authority": false,
          "band_mutation_authority": false,
          "external_effects": false
        }
      ],
      "pricing_state": "HYPOTHESIS",
      "commercial_validation": "UNPROVED",
      "customers_will_pay": "UNPROVED",
      "authority_created": false,
      "external_effects": false
    },
    {
      "slug": "site-studio",
      "product_id": "site_studio",
      "name": "Site Studio",
      "buyer_classes": [
        "C0",
        "C1",
        "C2",
        "C3",
        "C4"
      ],
      "pricing_model": "studio_project",
      "primary_scope_unit": "site_page",
      "governed_reference_band_zar": {
        "min": 1500,
        "max": 7500
      },
      "commercial_tiers": [
        {
          "tier_id": "individual_professional",
          "label": "Individual / Professional",
          "buyer_classes": [
            "C0",
            "C1"
          ],
          "eligible_buyer_classes": [
            "C0",
            "C1"
          ],
          "available": true,
          "reference_amount_zar": 1500,
          "pricing_truth": "GOVERNED_REFERENCE_POINT",
          "market_validation": "UNPROVED",
          "quote_issue_authority": false,
          "invoice_issue_authority": false,
          "band_mutation_authority": false,
          "external_effects": false
        },
        {
          "tier_id": "team_department",
          "label": "Team / Department",
          "buyer_classes": [
            "C2",
            "C3"
          ],
          "eligible_buyer_classes": [
            "C2",
            "C3"
          ],
          "available": true,
          "reference_amount_zar": 4500,
          "pricing_truth": "GOVERNED_REFERENCE_POINT",
          "market_validation": "UNPROVED",
          "quote_issue_authority": false,
          "invoice_issue_authority": false,
          "band_mutation_authority": false,
          "external_effects": false
        },
        {
          "tier_id": "enterprise_programme",
          "label": "Enterprise / Programme",
          "buyer_classes": [
            "C4",
            "C5"
          ],
          "eligible_buyer_classes": [
            "C4"
          ],
          "available": true,
          "reference_amount_zar": 7500,
          "pricing_truth": "GOVERNED_REFERENCE_POINT",
          "market_validation": "UNPROVED",
          "quote_issue_authority": false,
          "invoice_issue_authority": false,
          "band_mutation_authority": false,
          "external_effects": false
        }
      ],
      "pricing_state": "HYPOTHESIS",
      "commercial_validation": "UNPROVED",
      "customers_will_pay": "UNPROVED",
      "authority_created": false,
      "external_effects": false
    },
    {
      "slug": "sophia-integrity",
      "product_id": "sophia_integrity",
      "name": "Sophia Integrity",
      "buyer_classes": [
        "C0",
        "C1",
        "C2",
        "C3",
        "C4",
        "C5"
      ],
      "pricing_model": "document_scope",
      "primary_scope_unit": "manuscript_page",
      "governed_reference_band_zar": {
        "min": 750,
        "max": 3500
      },
      "commercial_tiers": [
        {
          "tier_id": "individual_professional",
          "label": "Individual / Professional",
          "buyer_classes": [
            "C0",
            "C1"
          ],
          "eligible_buyer_classes": [
            "C0",
            "C1"
          ],
          "available": true,
          "reference_amount_zar": 750,
          "pricing_truth": "GOVERNED_REFERENCE_POINT",
          "market_validation": "UNPROVED",
          "quote_issue_authority": false,
          "invoice_issue_authority": false,
          "band_mutation_authority": false,
          "external_effects": false
        },
        {
          "tier_id": "team_department",
          "label": "Team / Department",
          "buyer_classes": [
            "C2",
            "C3"
          ],
          "eligible_buyer_classes": [
            "C2",
            "C3"
          ],
          "available": true,
          "reference_amount_zar": 2100,
          "pricing_truth": "GOVERNED_REFERENCE_POINT",
          "market_validation": "UNPROVED",
          "quote_issue_authority": false,
          "invoice_issue_authority": false,
          "band_mutation_authority": false,
          "external_effects": false
        },
        {
          "tier_id": "enterprise_programme",
          "label": "Enterprise / Programme",
          "buyer_classes": [
            "C4",
            "C5"
          ],
          "eligible_buyer_classes": [
            "C4",
            "C5"
          ],
          "available": true,
          "reference_amount_zar": 3500,
          "pricing_truth": "GOVERNED_REFERENCE_POINT",
          "market_validation": "UNPROVED",
          "quote_issue_authority": false,
          "invoice_issue_authority": false,
          "band_mutation_authority": false,
          "external_effects": false
        }
      ],
      "pricing_state": "HYPOTHESIS",
      "commercial_validation": "UNPROVED",
      "customers_will_pay": "UNPROVED",
      "authority_created": false,
      "external_effects": false
    },
    {
      "slug": "sophia-research",
      "product_id": "sophia_research",
      "name": "Sophia Research",
      "buyer_classes": [
        "C0",
        "C1",
        "C2",
        "C3",
        "C4"
      ],
      "pricing_model": "research_scope",
      "primary_scope_unit": "source_item",
      "governed_reference_band_zar": {
        "min": 750,
        "max": 3000
      },
      "commercial_tiers": [
        {
          "tier_id": "individual_professional",
          "label": "Individual / Professional",
          "buyer_classes": [
            "C0",
            "C1"
          ],
          "eligible_buyer_classes": [
            "C0",
            "C1"
          ],
          "available": true,
          "reference_amount_zar": 750,
          "pricing_truth": "GOVERNED_REFERENCE_POINT",
          "market_validation": "UNPROVED",
          "quote_issue_authority": false,
          "invoice_issue_authority": false,
          "band_mutation_authority": false,
          "external_effects": false
        },
        {
          "tier_id": "team_department",
          "label": "Team / Department",
          "buyer_classes": [
            "C2",
            "C3"
          ],
          "eligible_buyer_classes": [
            "C2",
            "C3"
          ],
          "available": true,
          "reference_amount_zar": 1900,
          "pricing_truth": "GOVERNED_REFERENCE_POINT",
          "market_validation": "UNPROVED",
          "quote_issue_authority": false,
          "invoice_issue_authority": false,
          "band_mutation_authority": false,
          "external_effects": false
        },
        {
          "tier_id": "enterprise_programme",
          "label": "Enterprise / Programme",
          "buyer_classes": [
            "C4",
            "C5"
          ],
          "eligible_buyer_classes": [
            "C4"
          ],
          "available": true,
          "reference_amount_zar": 3000,
          "pricing_truth": "GOVERNED_REFERENCE_POINT",
          "market_validation": "UNPROVED",
          "quote_issue_authority": false,
          "invoice_issue_authority": false,
          "band_mutation_authority": false,
          "external_effects": false
        }
      ],
      "pricing_state": "HYPOTHESIS",
      "commercial_validation": "UNPROVED",
      "customers_will_pay": "UNPROVED",
      "authority_created": false,
      "external_effects": false
    },
    {
      "slug": "sophia-review",
      "product_id": "sophia_review",
      "name": "Sophia Review",
      "buyer_classes": [
        "C0",
        "C1",
        "C2",
        "C3",
        "C4"
      ],
      "pricing_model": "document_scope",
      "primary_scope_unit": "manuscript_page",
      "governed_reference_band_zar": {
        "min": 450,
        "max": 1500
      },
      "commercial_tiers": [
        {
          "tier_id": "individual_professional",
          "label": "Individual / Professional",
          "buyer_classes": [
            "C0",
            "C1"
          ],
          "eligible_buyer_classes": [
            "C0",
            "C1"
          ],
          "available": true,
          "reference_amount_zar": 450,
          "pricing_truth": "GOVERNED_REFERENCE_POINT",
          "market_validation": "UNPROVED",
          "quote_issue_authority": false,
          "invoice_issue_authority": false,
          "band_mutation_authority": false,
          "external_effects": false
        },
        {
          "tier_id": "team_department",
          "label": "Team / Department",
          "buyer_classes": [
            "C2",
            "C3"
          ],
          "eligible_buyer_classes": [
            "C2",
            "C3"
          ],
          "available": true,
          "reference_amount_zar": 1000,
          "pricing_truth": "GOVERNED_REFERENCE_POINT",
          "market_validation": "UNPROVED",
          "quote_issue_authority": false,
          "invoice_issue_authority": false,
          "band_mutation_authority": false,
          "external_effects": false
        },
        {
          "tier_id": "enterprise_programme",
          "label": "Enterprise / Programme",
          "buyer_classes": [
            "C4",
            "C5"
          ],
          "eligible_buyer_classes": [
            "C4"
          ],
          "available": true,
          "reference_amount_zar": 1500,
          "pricing_truth": "GOVERNED_REFERENCE_POINT",
          "market_validation": "UNPROVED",
          "quote_issue_authority": false,
          "invoice_issue_authority": false,
          "band_mutation_authority": false,
          "external_effects": false
        }
      ],
      "pricing_state": "HYPOTHESIS",
      "commercial_validation": "UNPROVED",
      "customers_will_pay": "UNPROVED",
      "authority_created": false,
      "external_effects": false
    },
    {
      "slug": "sophia-supervisor",
      "product_id": "sophia_supervisor",
      "name": "Sophia Supervisor",
      "buyer_classes": [
        "C0",
        "C1",
        "C2",
        "C3"
      ],
      "pricing_model": "milestone",
      "primary_scope_unit": "research_milestone",
      "governed_reference_band_zar": {
        "min": 500,
        "max": 2000
      },
      "commercial_tiers": [
        {
          "tier_id": "individual_professional",
          "label": "Individual / Professional",
          "buyer_classes": [
            "C0",
            "C1"
          ],
          "eligible_buyer_classes": [
            "C0",
            "C1"
          ],
          "available": true,
          "reference_amount_zar": 500,
          "pricing_truth": "GOVERNED_REFERENCE_POINT",
          "market_validation": "UNPROVED",
          "quote_issue_authority": false,
          "invoice_issue_authority": false,
          "band_mutation_authority": false,
          "external_effects": false
        },
        {
          "tier_id": "team_department",
          "label": "Team / Department",
          "buyer_classes": [
            "C2",
            "C3"
          ],
          "eligible_buyer_classes": [
            "C2",
            "C3"
          ],
          "available": true,
          "reference_amount_zar": 1250,
          "pricing_truth": "GOVERNED_REFERENCE_POINT",
          "market_validation": "UNPROVED",
          "quote_issue_authority": false,
          "invoice_issue_authority": false,
          "band_mutation_authority": false,
          "external_effects": false
        },
        {
          "tier_id": "enterprise_programme",
          "label": "Enterprise / Programme",
          "buyer_classes": [
            "C4",
            "C5"
          ],
          "eligible_buyer_classes": [],
          "available": false,
          "reference_amount_zar": null,
          "pricing_truth": "GOVERNED_REFERENCE_POINT",
          "market_validation": "UNPROVED",
          "quote_issue_authority": false,
          "invoice_issue_authority": false,
          "band_mutation_authority": false,
          "external_effects": false
        }
      ],
      "pricing_state": "HYPOTHESIS",
      "commercial_validation": "UNPROVED",
      "customers_will_pay": "UNPROVED",
      "authority_created": false,
      "external_effects": false
    },
    {
      "slug": "sophia-tutor",
      "product_id": "sophia_tutor",
      "name": "Sophia Tutor",
      "buyer_classes": [
        "C0",
        "C1",
        "C2",
        "C3"
      ],
      "pricing_model": "session_pack",
      "primary_scope_unit": "learning_topic",
      "governed_reference_band_zar": {
        "min": 250,
        "max": 1200
      },
      "commercial_tiers": [
        {
          "tier_id": "individual_professional",
          "label": "Individual / Professional",
          "buyer_classes": [
            "C0",
            "C1"
          ],
          "eligible_buyer_classes": [
            "C0",
            "C1"
          ],
          "available": true,
          "reference_amount_zar": 250,
          "pricing_truth": "GOVERNED_REFERENCE_POINT",
          "market_validation": "UNPROVED",
          "quote_issue_authority": false,
          "invoice_issue_authority": false,
          "band_mutation_authority": false,
          "external_effects": false
        },
        {
          "tier_id": "team_department",
          "label": "Team / Department",
          "buyer_classes": [
            "C2",
            "C3"
          ],
          "eligible_buyer_classes": [
            "C2",
            "C3"
          ],
          "available": true,
          "reference_amount_zar": 700,
          "pricing_truth": "GOVERNED_REFERENCE_POINT",
          "market_validation": "UNPROVED",
          "quote_issue_authority": false,
          "invoice_issue_authority": false,
          "band_mutation_authority": false,
          "external_effects": false
        },
        {
          "tier_id": "enterprise_programme",
          "label": "Enterprise / Programme",
          "buyer_classes": [
            "C4",
            "C5"
          ],
          "eligible_buyer_classes": [],
          "available": false,
          "reference_amount_zar": null,
          "pricing_truth": "GOVERNED_REFERENCE_POINT",
          "market_validation": "UNPROVED",
          "quote_issue_authority": false,
          "invoice_issue_authority": false,
          "band_mutation_authority": false,
          "external_effects": false
        }
      ],
      "pricing_state": "HYPOTHESIS",
      "commercial_validation": "UNPROVED",
      "customers_will_pay": "UNPROVED",
      "authority_created": false,
      "external_effects": false
    },
    {
      "slug": "suppliercyberproof",
      "product_id": "suppliercyberproof",
      "name": "SupplierCyberProof",
      "buyer_classes": [
        "C2",
        "C3",
        "C4",
        "C5"
      ],
      "pricing_model": "per_supplier_plus_setup",
      "primary_scope_unit": "supplier",
      "governed_reference_band_zar": {
        "min": 5000,
        "max": 30000
      },
      "commercial_tiers": [
        {
          "tier_id": "individual_professional",
          "label": "Individual / Professional",
          "buyer_classes": [
            "C0",
            "C1"
          ],
          "eligible_buyer_classes": [],
          "available": false,
          "reference_amount_zar": null,
          "pricing_truth": "GOVERNED_REFERENCE_POINT",
          "market_validation": "UNPROVED",
          "quote_issue_authority": false,
          "invoice_issue_authority": false,
          "band_mutation_authority": false,
          "external_effects": false
        },
        {
          "tier_id": "team_department",
          "label": "Team / Department",
          "buyer_classes": [
            "C2",
            "C3"
          ],
          "eligible_buyer_classes": [
            "C2",
            "C3"
          ],
          "available": true,
          "reference_amount_zar": 17500,
          "pricing_truth": "GOVERNED_REFERENCE_POINT",
          "market_validation": "UNPROVED",
          "quote_issue_authority": false,
          "invoice_issue_authority": false,
          "band_mutation_authority": false,
          "external_effects": false
        },
        {
          "tier_id": "enterprise_programme",
          "label": "Enterprise / Programme",
          "buyer_classes": [
            "C4",
            "C5"
          ],
          "eligible_buyer_classes": [
            "C4",
            "C5"
          ],
          "available": true,
          "reference_amount_zar": 30000,
          "pricing_truth": "GOVERNED_REFERENCE_POINT",
          "market_validation": "UNPROVED",
          "quote_issue_authority": false,
          "invoice_issue_authority": false,
          "band_mutation_authority": false,
          "external_effects": false
        }
      ],
      "pricing_state": "HYPOTHESIS",
      "commercial_validation": "UNPROVED",
      "customers_will_pay": "UNPROVED",
      "authority_created": false,
      "external_effects": false
    },
    {
      "slug": "tenderproof",
      "product_id": "tenderproof",
      "name": "TenderProof",
      "buyer_classes": [
        "C1",
        "C2",
        "C3",
        "C4"
      ],
      "pricing_model": "package",
      "primary_scope_unit": "tender_requirement",
      "governed_reference_band_zar": {
        "min": 1200,
        "max": 6000
      },
      "commercial_tiers": [
        {
          "tier_id": "individual_professional",
          "label": "Individual / Professional",
          "buyer_classes": [
            "C0",
            "C1"
          ],
          "eligible_buyer_classes": [
            "C1"
          ],
          "available": true,
          "reference_amount_zar": 1200,
          "pricing_truth": "GOVERNED_REFERENCE_POINT",
          "market_validation": "UNPROVED",
          "quote_issue_authority": false,
          "invoice_issue_authority": false,
          "band_mutation_authority": false,
          "external_effects": false
        },
        {
          "tier_id": "team_department",
          "label": "Team / Department",
          "buyer_classes": [
            "C2",
            "C3"
          ],
          "eligible_buyer_classes": [
            "C2",
            "C3"
          ],
          "available": true,
          "reference_amount_zar": 3600,
          "pricing_truth": "GOVERNED_REFERENCE_POINT",
          "market_validation": "UNPROVED",
          "quote_issue_authority": false,
          "invoice_issue_authority": false,
          "band_mutation_authority": false,
          "external_effects": false
        },
        {
          "tier_id": "enterprise_programme",
          "label": "Enterprise / Programme",
          "buyer_classes": [
            "C4",
            "C5"
          ],
          "eligible_buyer_classes": [
            "C4"
          ],
          "available": true,
          "reference_amount_zar": 6000,
          "pricing_truth": "GOVERNED_REFERENCE_POINT",
          "market_validation": "UNPROVED",
          "quote_issue_authority": false,
          "invoice_issue_authority": false,
          "band_mutation_authority": false,
          "external_effects": false
        }
      ],
      "pricing_state": "HYPOTHESIS",
      "commercial_validation": "UNPROVED",
      "customers_will_pay": "UNPROVED",
      "authority_created": false,
      "external_effects": false
    },
    {
      "slug": "vamp-performance",
      "product_id": "vamp_performance",
      "name": "VAMP Performance",
      "buyer_classes": [
        "C0",
        "C1",
        "C2",
        "C3",
        "C4",
        "C5"
      ],
      "pricing_model": "evidence_pack",
      "primary_scope_unit": "performance_evidence_item",
      "governed_reference_band_zar": {
        "min": 500,
        "max": 2500
      },
      "commercial_tiers": [
        {
          "tier_id": "individual_professional",
          "label": "Individual / Professional",
          "buyer_classes": [
            "C0",
            "C1"
          ],
          "eligible_buyer_classes": [
            "C0",
            "C1"
          ],
          "available": true,
          "reference_amount_zar": 500,
          "pricing_truth": "GOVERNED_REFERENCE_POINT",
          "market_validation": "UNPROVED",
          "quote_issue_authority": false,
          "invoice_issue_authority": false,
          "band_mutation_authority": false,
          "external_effects": false
        },
        {
          "tier_id": "team_department",
          "label": "Team / Department",
          "buyer_classes": [
            "C2",
            "C3"
          ],
          "eligible_buyer_classes": [
            "C2",
            "C3"
          ],
          "available": true,
          "reference_amount_zar": 1500,
          "pricing_truth": "GOVERNED_REFERENCE_POINT",
          "market_validation": "UNPROVED",
          "quote_issue_authority": false,
          "invoice_issue_authority": false,
          "band_mutation_authority": false,
          "external_effects": false
        },
        {
          "tier_id": "enterprise_programme",
          "label": "Enterprise / Programme",
          "buyer_classes": [
            "C4",
            "C5"
          ],
          "eligible_buyer_classes": [
            "C4",
            "C5"
          ],
          "available": true,
          "reference_amount_zar": 2500,
          "pricing_truth": "GOVERNED_REFERENCE_POINT",
          "market_validation": "UNPROVED",
          "quote_issue_authority": false,
          "invoice_issue_authority": false,
          "band_mutation_authority": false,
          "external_effects": false
        }
      ],
      "pricing_state": "HYPOTHESIS",
      "commercial_validation": "UNPROVED",
      "customers_will_pay": "UNPROVED",
      "authority_created": false,
      "external_effects": false
    },
    {
      "slug": "vendorproof",
      "product_id": "vendorproof",
      "name": "VendorProof",
      "buyer_classes": [
        "C1",
        "C2",
        "C3",
        "C4",
        "C5"
      ],
      "pricing_model": "per_vendor_plus_setup",
      "primary_scope_unit": "vendor_record",
      "governed_reference_band_zar": {
        "min": 1500,
        "max": 7500
      },
      "commercial_tiers": [
        {
          "tier_id": "individual_professional",
          "label": "Individual / Professional",
          "buyer_classes": [
            "C0",
            "C1"
          ],
          "eligible_buyer_classes": [
            "C1"
          ],
          "available": true,
          "reference_amount_zar": 1500,
          "pricing_truth": "GOVERNED_REFERENCE_POINT",
          "market_validation": "UNPROVED",
          "quote_issue_authority": false,
          "invoice_issue_authority": false,
          "band_mutation_authority": false,
          "external_effects": false
        },
        {
          "tier_id": "team_department",
          "label": "Team / Department",
          "buyer_classes": [
            "C2",
            "C3"
          ],
          "eligible_buyer_classes": [
            "C2",
            "C3"
          ],
          "available": true,
          "reference_amount_zar": 4500,
          "pricing_truth": "GOVERNED_REFERENCE_POINT",
          "market_validation": "UNPROVED",
          "quote_issue_authority": false,
          "invoice_issue_authority": false,
          "band_mutation_authority": false,
          "external_effects": false
        },
        {
          "tier_id": "enterprise_programme",
          "label": "Enterprise / Programme",
          "buyer_classes": [
            "C4",
            "C5"
          ],
          "eligible_buyer_classes": [
            "C4",
            "C5"
          ],
          "available": true,
          "reference_amount_zar": 7500,
          "pricing_truth": "GOVERNED_REFERENCE_POINT",
          "market_validation": "UNPROVED",
          "quote_issue_authority": false,
          "invoice_issue_authority": false,
          "band_mutation_authority": false,
          "external_effects": false
        }
      ],
      "pricing_state": "HYPOTHESIS",
      "commercial_validation": "UNPROVED",
      "customers_will_pay": "UNPROVED",
      "authority_created": false,
      "external_effects": false
    },
    {
      "slug": "vesper-desk",
      "product_id": "vesper_desk",
      "name": "Vesper Desk",
      "buyer_classes": [
        "C1",
        "C2",
        "C3",
        "C4",
        "C5"
      ],
      "pricing_model": "platform_service",
      "primary_scope_unit": "customer_case",
      "governed_reference_band_zar": {
        "min": 1000,
        "max": 7500
      },
      "commercial_tiers": [
        {
          "tier_id": "individual_professional",
          "label": "Individual / Professional",
          "buyer_classes": [
            "C0",
            "C1"
          ],
          "eligible_buyer_classes": [
            "C1"
          ],
          "available": true,
          "reference_amount_zar": 1000,
          "pricing_truth": "GOVERNED_REFERENCE_POINT",
          "market_validation": "UNPROVED",
          "quote_issue_authority": false,
          "invoice_issue_authority": false,
          "band_mutation_authority": false,
          "external_effects": false
        },
        {
          "tier_id": "team_department",
          "label": "Team / Department",
          "buyer_classes": [
            "C2",
            "C3"
          ],
          "eligible_buyer_classes": [
            "C2",
            "C3"
          ],
          "available": true,
          "reference_amount_zar": 4250,
          "pricing_truth": "GOVERNED_REFERENCE_POINT",
          "market_validation": "UNPROVED",
          "quote_issue_authority": false,
          "invoice_issue_authority": false,
          "band_mutation_authority": false,
          "external_effects": false
        },
        {
          "tier_id": "enterprise_programme",
          "label": "Enterprise / Programme",
          "buyer_classes": [
            "C4",
            "C5"
          ],
          "eligible_buyer_classes": [
            "C4",
            "C5"
          ],
          "available": true,
          "reference_amount_zar": 7500,
          "pricing_truth": "GOVERNED_REFERENCE_POINT",
          "market_validation": "UNPROVED",
          "quote_issue_authority": false,
          "invoice_issue_authority": false,
          "band_mutation_authority": false,
          "external_effects": false
        }
      ],
      "pricing_state": "HYPOTHESIS",
      "commercial_validation": "UNPROVED",
      "customers_will_pay": "UNPROVED",
      "authority_created": false,
      "external_effects": false
    }
  ],
  "pricing_truth_boundary": "Reference bands and tier reference points are governed hypotheses. Commercial validation and willingness to pay remain unproved until settled independent-customer evidence exists.",
  "authority_created": false,
  "external_effects": false
};
})();
