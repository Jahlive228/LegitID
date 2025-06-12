// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/AccessControl.sol";

contract BlockchainIdSystem is AccessControl {
    bytes32 public constant ISSUER_ROLE = keccak256("ISSUER_ROLE");
    bytes32 public constant VERIFIER_ROLE = keccak256("VERIFIER_ROLE");
    
    string public baseURI;
    mapping(string => string) public documentsArray;

    constructor(address defaultAdmin, string memory _baseURI) {
        _grantRole(DEFAULT_ADMIN_ROLE, defaultAdmin);
        baseURI = _baseURI;
    }

    // Role management functions
    function grantIssuerRole(address account) public onlyRole(DEFAULT_ADMIN_ROLE) {
        grantRole(ISSUER_ROLE, account);
    }

    function grantVerifierRole(address account) public onlyRole(DEFAULT_ADMIN_ROLE) {
        grantRole(VERIFIER_ROLE, account);
    }

    function revokeIssuerRole(address account) public onlyRole(DEFAULT_ADMIN_ROLE) {
        revokeRole(ISSUER_ROLE, account);
    }

    function revokeVerifierRole(address account) public onlyRole(DEFAULT_ADMIN_ROLE) {
        revokeRole(VERIFIER_ROLE, account);
    }

    // Document management functions
    function registerDocument(string memory documentHash, string memory imageHash) public onlyRole(ISSUER_ROLE) {
        require(bytes(documentHash).length > 0, "Le hash du document ne peut pas rester vide");
        require(bytes(documentsArray[documentHash]).length == 0, "Le document existe");
        documentsArray[documentHash] = imageHash;
    }

    function getDocument(string memory documentHash) public view returns (string memory) {
        require(bytes(documentsArray[documentHash]).length > 0, "Le document n'existe pas");
        return documentsArray[documentHash];
    }

    function checkIsValidDocumentId(string memory searchString) public view returns (bool) {
        return bytes(documentsArray[searchString]).length > 0;
    }

    function checkisVerifier(address account) public view returns (bool) {
        return hasRole(VERIFIER_ROLE, account);
    }

    // Override supportsInterface function from AccessControl
    function supportsInterface(bytes4 interfaceId) public view virtual override returns (bool) {
        return super.supportsInterface(interfaceId);
    }
} 