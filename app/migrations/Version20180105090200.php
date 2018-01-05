<?php declare(strict_types = 1);

namespace PHPDish\Migrations;

use Doctrine\DBAL\Migrations\AbstractMigration;
use Doctrine\DBAL\Schema\Schema;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
class Version20180105090200 extends AbstractMigration
{
    public function up(Schema $schema)
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('CREATE TABLE threads_followers (thread_id INT NOT NULL, user_id INT NOT NULL, INDEX IDX_874AD422E2904019 (thread_id), INDEX IDX_874AD422A76ED395 (user_id), PRIMARY KEY(thread_id, user_id)) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci ENGINE = InnoDB');
        $this->addSql('ALTER TABLE threads_followers ADD CONSTRAINT FK_874AD422E2904019 FOREIGN KEY (thread_id) REFERENCES threads (id)');
        $this->addSql('ALTER TABLE threads_followers ADD CONSTRAINT FK_874AD422A76ED395 FOREIGN KEY (user_id) REFERENCES users (id)');
        $this->addSql('ALTER TABLE threads ADD cover VARCHAR(255) DEFAULT NULL, ADD topic_count INT NOT NULL, ADD follower_count INT NOT NULL');
    }

    public function down(Schema $schema)
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('DROP TABLE threads_followers');
        $this->addSql('ALTER TABLE threads DROP cover, DROP topic_count, DROP follower_count');
    }
}
