# 📋 **PLAN DÉTAILLÉ DES TESTS À RÉALISER POUR FROM-A2B**

## **�� 1. TESTS UNITAIRES**

### **1.1 Utilitaires (`src/utils/`)**

```typescript
// Fichiers à tester :
- src/utils/getTravelMode.tsx
- src/utils/reSort.ts
- src/utils/GetStepRank.ts
- src/utils/file.ts
- src/utils/formatBytes.ts
- src/utils/array.ts
- src/utils/getGeolocation.ts

// Types de tests :
- Conversion des modes de transport
- Calcul des rangs d'étapes
- Tri et réorganisation des entités
- Formatage des tailles de fichiers
- Manipulation d'arrays
- Géolocalisation
```

### **1.2 Fonctions de formatage (`src/lib/format/`)**

```typescript
// Fichiers à tester :
- src/lib/format/id.ts
- src/lib/format/displayName.ts
- src/lib/format/date.ts

// Types de tests :
- Génération de slugs
- Formatage d'IDs
- Extraction de noms depuis emails
- Formatage de dates
- Affichage des noms d'utilisateurs
```

### **1.3 Hooks personnalisés (`src/hooks/`)**

```typescript
// Fichiers à tester :
- src/hooks/use-debounce.ts
- src/hooks/use-mobile.tsx
- src/hooks/useDisclosure.ts
- src/hooks/useWarnIfUnsavedChanges.ts
- src/hooks/useCurrentPath.ts
- src/hooks/useMatchingPathname.ts
- src/hooks/useIsClient.ts
- src/hooks/useClientFeatureFlag.ts

// Types de tests :
- Debounce des valeurs
- Détection mobile/desktop
- Gestion des états d'ouverture/fermeture
- Avertissements de changements non sauvegardés
- Détection du chemin actuel
- Correspondance de chemins
- Détection côté client
- Feature flags côté client
```

## **🔗 2. TESTS D'INTÉGRATION**

### **2.1 Server Actions (`src/features/`)**

```typescript
// Fichiers à tester :
- src/features/trip/addTrip.action.ts
- src/features/trip/editTrip.action.ts
- src/features/trip/deleteTrip.action.ts
- src/features/steps/addStep.action.ts
- src/features/steps/editStep.action.ts
- src/features/steps/deleteStep.action.ts
- src/features/road/addRoadBetweenSteps.ts
- src/features/files/addFile.action.ts
- src/features/files/deleteFile.action.ts
- src/features/scheduling/task/addTask.action.ts
- src/features/scheduling/task/editTask.action.ts
- src/features/scheduling/task/deleteTask.action.ts
- src/features/org/createOrg.action.ts
- src/features/org/updateOrg.action.ts

// Types de tests :
- Création/modification/suppression d'entités
- Validation des schémas Zod
- Gestion des erreurs
- Permissions et autorisations
- Intégration avec Prisma
- Calculs automatiques (routes, rangs)
```

### **2.2 Queries (`src/features/`)**

```typescript
// Fichiers à tester :
- src/features/trip/get/getTrip.query.ts
- src/features/trip/get/getTripsByCurrentOrgQuery.query.ts
- src/features/trip/get/searchTripsQuery.query.ts
- src/features/steps/get/getAllSteps.query.ts
- src/features/steps/get/getStepBySlug.query.ts
- src/features/files/get/getFilesByStepSlug.query.ts
- src/features/scheduling/task/getTasksByStepSlug.query.ts
- src/features/org/get/getUsersOrgs.query.ts

// Types de tests :
- Récupération de données
- Filtrage et recherche
- Relations entre entités
- Pagination
- Tri et ordonnancement
- Gestion des cas vides
```

### **2.3 API Routes (`src/app/api/`)**

```typescript
// Fichiers à tester :
- src/app/api/address/autocomplete/route.ts
- src/app/api/address/place/route.ts
- src/app/api/auth/[...nextauth]/route.ts
- src/app/api/edgestore/[...edgestore]/route.ts
- src/app/api/webhooks/stripe/route.ts
- src/app/api/webhooks/resend/route.ts

// Types de tests :
- Endpoints d'autocomplétion d'adresses
- Recherche de lieux
- Authentification NextAuth
- Upload de fichiers
- Webhooks Stripe
- Webhooks Resend
```

### **2.4 Services externes (`src/lib/api/`)**

```typescript
// Fichiers à tester :
- src/lib/api/routes/computeRoutes.ts
- src/lib/api/places/search.ts
- src/lib/api/places/placeId.ts
- src/lib/api/geocoding/reverseGeocoding.ts

// Types de tests :
- Calcul d'itinéraires Google Maps
- Recherche de lieux
- Géocodage inverse
- Gestion des erreurs API
- Formatage des réponses
```

## **�� 3. TESTS DE COMPOSANTS**

### **3.1 Composants UI (`src/components/ui/`)**

```typescript
// Fichiers à tester :
- src/components/ui/button.tsx
- src/components/ui/input.tsx
- src/components/ui/dialog.tsx
- src/components/ui/select.tsx
- src/components/ui/datepicker.tsx
- src/components/ui/avatar.tsx
- src/components/ui/card.tsx
- src/components/ui/form.tsx
- src/components/ui/alert.tsx
- src/components/ui/toast.tsx
- src/components/ui/typography.tsx
- src/components/ui/separator.tsx
- src/components/ui/accordion.tsx
- src/components/ui/tabs.tsx
- src/components/ui/dropdown-menu.tsx
- src/components/ui/popover.tsx
- src/components/ui/tooltip.tsx
- src/components/ui/switch.tsx
- src/components/ui/checkbox.tsx
- src/components/ui/radio-group.tsx
- src/components/ui/progress.tsx
- src/components/ui/slider.tsx
- src/components/ui/textarea.tsx
- src/components/ui/label.tsx
- src/components/ui/badge.tsx
- src/components/ui/scroll-area.tsx
- src/components/ui/aspect-ratio.tsx
- src/components/ui/collapsible.tsx
- src/components/ui/command.tsx
- src/components/ui/context-menu.tsx
- src/components/ui/hover-card.tsx
- src/components/ui/menubar.tsx
- src/components/ui/navigation-menu.tsx
- src/components/ui/sheet.tsx
- src/components/ui/table.tsx
- src/components/ui/toggle.tsx
- src/components/ui/toggle-group.tsx

// Types de tests :
- Rendu correct des props
- Gestion des événements (click, change, etc.)
- États (disabled, loading, error)
- Variants et tailles
- Accessibilité (ARIA labels, keyboard navigation)
- Intégration avec React Hook Form
- Responsive design
```

### **3.2 Composants métier (`src/components/`)**

```typescript
// Fichiers à tester :
- src/components/trips/addTripDialog.tsx
- src/components/trips/editTripForm.tsx
- src/components/trips/tripCard.tsx
- src/components/steps/addStepDialog.tsx
- src/components/steps/editStepDialog.tsx
- src/components/steps/deleteStepAlertDialog.tsx
- src/components/steps/stepCard.tsx
- src/components/steps/stepList.tsx
- src/components/files/fileUploader.tsx
- src/components/files/filesList.tsx
- src/components/files/fileItem.tsx
- src/components/scheduling/taskList.tsx
- src/components/scheduling/addTaskDialog.tsx
- src/components/scheduling/editTaskDialog.tsx
- src/components/scheduling/deleteTaskAlertDialog.tsx
- src/components/auth/AuthButton.tsx
- src/components/auth/UserDropDown.tsx
- src/components/auth/SignInButton.tsx
- src/components/address/addressAutoComplete.tsx
- src/components/address/addressAutoCompleteInput.tsx
- src/components/address/addressDialog.tsx
- src/components/images/ImageFormItem.tsx
- src/components/images/ImageUploadInput.tsx
- src/components/images/ImageOverlay.tsx
- src/components/layout/Header.tsx
- src/components/layout/Footer.tsx
- src/components/layout/BaseLayout.tsx
- src/components/navigation/NavigationWrapper.tsx
- src/components/navigation/LogInNavigationWrapper.tsx
- src/components/globalDialog/GlobalDialog.tsx
- src/components/globalDialog/GlobalDialogLazy.tsx
- src/components/globalDialog/OrgPlanDialog.tsx
- src/components/form/FormOptionalSection.tsx
- src/components/form/FormUnsavedBar.tsx
- src/components/form/LoadingButton.tsx
- src/components/email/EmailForm.tsx
- src/components/email/EmailFormSection.tsx
- src/components/contact/feedback/ContactFeedbackPopover.tsx
- src/components/contact/support/ContactSupportPopover.tsx
- src/components/map/poiMarkers.tsx
- src/components/nextStep/nextStepCard.tsx
- src/components/nextStepJs/StartTourBadge.tsx
- src/components/page/NextTopLoader.tsx
- src/components/page/Page400.tsx
- src/components/plans/PricingCard.tsx
- src/components/plans/PricingSection.tsx
- src/components/searchparams-message/SearchParamsMessageToast.tsx
- src/components/stripe/BuyButton.tsx
- src/components/svg/LogoNameSvg.tsx
- src/components/svg/CircleSvg.tsx
- src/components/svg/DotPattern.tsx
- src/components/theme/ThemeToggle.tsx
- src/components/video/video.tsx
- src/components/utils/ErrorBoundaries.tsx
- src/components/utils/TailwindIndicator.tsx

// Types de tests :
- Rendu avec données
- Gestion des états (loading, error, success)
- Interactions utilisateur
- Validation des formulaires
- Intégration avec les Server Actions
- Gestion des erreurs
- Responsive design
- Accessibilité
```

## **🌐 4. TESTS DE PAGES**

### **4.1 Pages publiques (`src/app/(landing)/`)**

```typescript
// Fichiers à tester :
- src/app/(landing)/page.tsx
- src/app/(landing)/_components/Hero.tsx
- src/app/(landing)/_components/FeatureSection.tsx
- src/app/(landing)/_components/StatsSection.tsx
- src/app/(landing)/_components/FAQSection.tsx
- src/app/(landing)/_components/BentoSection.tsx
- src/app/(landing)/_components/StepSection.tsx
- src/app/(landing)/_components/MapSection.tsx
- src/app/(landing)/_components/cta/CTASection.tsx
- src/app/(landing)/_components/cta/CTAImageSection.tsx
- src/app/(landing)/_components/review/ReviewTriple.tsx
- src/app/(landing)/_components/review/MarqueeReview.tsx

// Types de tests :
- Rendu des sections
- Interactions utilisateur
- Responsive design
- Performance de chargement
- SEO (métadonnées)
```

### **4.2 Pages d'authentification (`src/app/auth/`)**

```typescript
// Fichiers à tester :
- src/app/auth/signin/page.tsx
- src/app/auth/signin/MagicLinkForm.tsx
- src/app/auth/signin/ProviderButton.tsx
- src/app/auth/signup/page.tsx
- src/app/auth/signup/signup.action.ts
- src/app/auth/signup/signup.schema.ts
- src/app/auth/error/page.tsx
- src/app/auth/verify-request/page.tsx
- src/app/auth/new-user/page.tsx

// Types de tests :
- Formulaires d'authentification
- Validation des champs
- Gestion des erreurs
- Redirections
- Intégration NextAuth
```

### **4.3 Pages d'organisation (`src/app/orgs/`)**

```typescript
// Fichiers à tester :
- src/app/orgs/[orgSlug]/layout.tsx
- src/app/orgs/[orgSlug]/(navigation)/layout.tsx
- src/app/orgs/[orgSlug]/(navigation)/_navigation/OrgNavigation.tsx
- src/app/orgs/[orgSlug]/(navigation)/_navigation/OrgLinks.tsx
- src/app/orgs/[orgSlug]/(navigation)/_navigation/OrgsSelect.tsx
- src/app/orgs/[orgSlug]/(navigation)/_navigation/OrgCommand.tsx
- src/app/orgs/[orgSlug]/(navigation)/_navigation/UpgradeCard.tsx
- src/app/orgs/[orgSlug]/(navigation)/(overview)/page.tsx
- src/app/orgs/[orgSlug]/(navigation)/trips/_components/tripsContainer.tsx
- src/app/orgs/[orgSlug]/(navigation)/trips/_components/tripCard.tsx
- src/app/orgs/[orgSlug]/(navigation)/trips/_components/emptyTrips.tsx
- src/app/orgs/[orgSlug]/(navigation)/trips/_components/cardDeleteButton.tsx
- src/app/orgs/[orgSlug]/(navigation)/history/_components/TravelHistoryEmpty.tsx
- src/app/orgs/[orgSlug]/(navigation)/settings/layout.tsx
- src/app/orgs/[orgSlug]/(navigation)/settings/(details)/page.tsx
- src/app/orgs/[orgSlug]/(navigation)/settings/(details)/OrgDetailsForm.tsx
- src/app/orgs/[orgSlug]/(navigation)/settings/members/page.tsx
- src/app/orgs/[orgSlug]/(navigation)/settings/members/OrgMembersForm.tsx
- src/app/orgs/[orgSlug]/(navigation)/settings/members/OrgInviteMemberForm.tsx
- src/app/orgs/[orgSlug]/(navigation)/settings/billing/page.tsx
- src/app/orgs/[orgSlug]/(navigation)/settings/danger/page.tsx
- src/app/orgs/[orgSlug]/(navigation)/settings/danger/OrgDangerForm.tsx
- src/app/orgs/[orgSlug]/(navigation)/settings/danger/OrganizationDeleteDialog.tsx
- src/app/orgs/new/NewOrgForm.tsx
- src/app/orgs/new/new-org.action.ts
- src/app/orgs/new/new-org.schema.ts

// Types de tests :
- Navigation entre organisations
- Gestion des rôles et permissions
- Formulaires de configuration
- Gestion des membres
- Facturation et plans
- Suppression d'organisation
```

### **4.4 Pages de voyages (`src/app/orgs/[orgSlug]/trips/`)**

```typescript
// Fichiers à tester :
- src/app/orgs/[orgSlug]/trips/[tripSlug]/page.tsx
- src/app/orgs/[orgSlug]/trips/[tripSlug]/layout.tsx
- src/app/orgs/[orgSlug]/trips/[tripSlug]/_component/stepList.tsx
- src/app/orgs/[orgSlug]/trips/[tripSlug]/_component/tripMap.tsx
- src/app/orgs/[orgSlug]/trips/[tripSlug]/_component/RoadsPath.tsx
- src/app/orgs/[orgSlug]/trips/[tripSlug]/details/page.tsx
- src/app/orgs/[orgSlug]/trips/[tripSlug]/details/steps/page.tsx
- src/app/orgs/[orgSlug]/trips/[tripSlug]/details/steps/_component/detailStepList.tsx
- src/app/orgs/[orgSlug]/trips/[tripSlug]/details/steps/[stepSlug]/(StepDetails)/page.tsx
- src/app/orgs/[orgSlug]/trips/[tripSlug]/details/steps/[stepSlug]/(StepDetails)/_component/StepDetail.tsx
- src/app/orgs/[orgSlug]/trips/[tripSlug]/details/steps/[stepSlug]/scheduling/page.tsx
- src/app/orgs/[orgSlug]/trips/[tripSlug]/details/steps/[stepSlug]/scheduling/_component/taskList.tsx
- src/app/orgs/[orgSlug]/trips/[tripSlug]/details/steps/[stepSlug]/scheduling/_component/addTaskDialog.tsx
- src/app/orgs/[orgSlug]/trips/[tripSlug]/details/steps/[stepSlug]/scheduling/_component/editTaskDialog.tsx
- src/app/orgs/[orgSlug]/trips/[tripSlug]/details/steps/[stepSlug]/scheduling/_component/deleteTaskAlertDialog.tsx
- src/app/orgs/[orgSlug]/trips/[tripSlug]/details/steps/[stepSlug]/scheduling/_component/scheduleNotesMdxEditor.tsx
- src/app/orgs/[orgSlug]/trips/[tripSlug]/details/steps/[stepSlug]/scheduling/_component/taskNotesMdxEditor.tsx
- src/app/orgs/[orgSlug]/trips/[tripSlug]/details/steps/[stepSlug]/files/page.tsx
- src/app/orgs/[orgSlug]/trips/[tripSlug]/details/steps/[stepSlug]/files/_component/filesList.tsx
- src/app/orgs/[orgSlug]/trips/[tripSlug]/details/steps/[stepSlug]/files/_component/fileUploader.tsx
- src/app/orgs/[orgSlug]/trips/[tripSlug]/details/steps/[stepSlug]/files/_component/deleteFileAlertDialog.tsx

// Types de tests :
- Affichage des voyages et étapes
- Interactions avec la carte
- Gestion des tâches
- Upload de fichiers
- Édition des notes
- Calcul des routes
- Responsive design
```

### **4.5 Pages de compte (`src/app/(logged-in)/(account-layout)/`)**

```typescript
// Fichiers à tester :
- src/app/(logged-in)/(account-layout)/account/page.tsx
- src/app/(logged-in)/(account-layout)/account/email/page.tsx
- src/app/(logged-in)/(account-layout)/account/email/ToggleEmailCheckbox.tsx
- src/app/(logged-in)/(account-layout)/account/verify-email/VerifyEmailButton.tsx
- src/app/(logged-in)/(account-layout)/account/danger/page.tsx
- src/app/(logged-in)/(account-layout)/account/danger/confirm/page.tsx
- src/app/(logged-in)/(account-layout)/account/danger/confirm/_components/DeleteAccountCard.tsx
- src/app/(logged-in)/(account-layout)/account.links.tsx
- src/app/(logged-in)/(account-layout)/accountNavigation.tsx
- src/app/(logged-in)/(account-layout)/accountNavigationLinks.tsx

// Types de tests :
- Gestion du profil utilisateur
- Vérification d'email
- Suppression de compte
- Navigation du compte
```

## **🎯 5. TESTS E2E**

### **5.1 Parcours utilisateur complets**

```typescript
// Scénarios à tester :
1. Inscription et première connexion
2. Création d'une organisation
3. Création d'un voyage complet
4. Ajout d'étapes avec calcul d'itinéraires
5. Gestion des tâches par étape
6. Upload et gestion de fichiers
7. Partage d'un voyage
8. Modification et suppression
9. Gestion des membres d'organisation
10. Facturation et plans
11. Suppression de compte
12. Mode maintenance
13. Responsive design (mobile/desktop)
14. Mode sombre/clair
15. Accessibilité (navigation clavier, lecteurs d'écran)
```

### **5.2 Tests de performance**

```typescript
// Métriques à tester :
- Temps de chargement des pages
- Temps de réponse des API
- Performance de la carte Google Maps
- Gestion de gros volumes de données
- Optimisation des images
- Bundle size
- Core Web Vitals
```

## **🔄 6. TESTS DE RÉGRESSION**

### **6.1 Tests visuels**

```typescript
// Pages à capturer :
- Landing page
- Page de connexion
- Dashboard d'organisation
- Liste des voyages
- Détail d'un voyage
- Formulaire d'ajout d'étape
- Page de planification
- Page de fichiers
- Paramètres d'organisation
- Page de compte
- Mode mobile
- Mode sombre
```

### **6.2 Tests de régression fonctionnelle**

```typescript
// Fonctionnalités critiques :
- Authentification
- CRUD des voyages
- CRUD des étapes
- Calcul d'itinéraires
- Gestion des tâches
- Upload de fichiers
- Gestion des organisations
- Facturation
- Navigation
- Recherche
```

## **📊 7. PRIORITÉS DE TESTS**

### **7.1 Priorité HAUTE (Critique)**

```typescript
- Authentification et sécurité
- CRUD des voyages et étapes
- Calcul d'itinéraires
- Gestion des fichiers
- Navigation et routing
- Gestion des erreurs
```

### **7.2 Priorité MOYENNE (Important)**

```typescript
- Composants UI réutilisables
- Formulaires et validation
- Intégration Google Maps
- Gestion des organisations
- Performance de base
```

### **7.3 Priorité BASSE (Amélioration)**

```typescript
- Tests de régression visuelle
- Tests de performance avancés
- Tests d'accessibilité approfondis
- Tests de stress
- Tests de compatibilité navigateurs
```

Ce plan couvre **tous les fichiers et fonctionnalités** de votre application From-A2B avec une approche structurée par priorité.
